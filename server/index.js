const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const slotRoutes = require('./routes/slots');
const profileRoutes = require('./routes/profile');

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Health check (VERY IMPORTANT for Azure) */
app.get('/', (req, res) => {
  res.send('API is running');
});

/* Routes */
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/profile', profileRoutes);

/* Port (Azure uses process.env.PORT) */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
