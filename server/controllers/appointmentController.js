const db = require('../config/db');
const sendEmail = require('../utils/sendEmail');

exports.bookAppointment = async (req, res) => {
  const { email, service, date, time_slot } = req.body;

  if (!email || !service || !date || !time_slot) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const [users] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found. Please register first.' });
    }
    const user_id = users[0].id;

    const [services] = await db.promise().query('SELECT id FROM services WHERE name = ?', [service]);
    if (services.length === 0) {
      return res.status(400).json({ message: 'Service not found.' });
    }
    const service_id = services[0].id;

    const [slots] = await db.promise().query('SELECT id FROM slots WHERE slot_time = ?', [time_slot]);
    if (slots.length === 0) {
      return res.status(400).json({ message: 'Time slot not found.' });
    }
    const slot_id = slots[0].id;

    const [existing] = await db.promise().query(
      'SELECT * FROM appointments WHERE appointment_date = ? AND slot_id = ? AND service_id = ?',
      [date, slot_id, service_id]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'This time slot is already booked for the selected service.' });
    }

    await db.promise().query(
      'INSERT INTO appointments (user_id, service_id, slot_id, appointment_date, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, service_id, slot_id, date, 'pending']
    );

    try {
      await sendEmail(
        email,
        'Appointment Confirmed 💅',
        `Hi! Your ${service} appointment is confirmed for ${date} at ${time_slot}.`
      );
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      return res.status(200).json({ message: 'Appointment booked but failed to send confirmation email.' });
    }

    return res.status(200).json({ message: 'Appointment booked and email sent ✅' });
  } catch (error) {
    console.error('❌ Booking error:', error);
    return res.status(500).json({ message: 'Server error while booking.' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [rows] = await db.promise().query(
      `SELECT a.id, s.name AS service_name, a.appointment_date, sl.slot_time
       FROM appointments a
       JOIN services s ON a.service_id = s.id
       JOIN slots sl ON a.slot_id = sl.id
       WHERE a.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('❌ Get error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
