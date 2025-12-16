const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ message: 'Date query parameter is required' });
  }

  try {
    const [allSlots] = await db.promise().query('SELECT id, slot_time FROM slots');

    const [booked] = await db.promise().query(
      'SELECT slot_id FROM appointments WHERE appointment_date = ?',
      [String(date)]
    );
    const bookedIds = booked.map(row => row.slot_id);

    const availableSlots = allSlots
      .filter(slot => !bookedIds.includes(slot.id))
      .map(slot => slot.slot_time);

    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Slots API error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

module.exports = router;
