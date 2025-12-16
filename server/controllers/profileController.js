const db = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing' });

    const [rows] = await db.promise().query(
      'SELECT id, email, name FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing' });

    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if email is used by another user
    const [existing] = await db.promise().query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already in use by another account.' });
    }

    await db.promise().query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name || null, email, userId]
    );

    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile.' });
  }
};
