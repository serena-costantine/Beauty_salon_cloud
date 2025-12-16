const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', appointmentController.bookAppointment);
router.get('/', authMiddleware, appointmentController.getAppointments);

module.exports = router;
