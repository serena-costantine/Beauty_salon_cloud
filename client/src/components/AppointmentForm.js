import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentForm.css';

const services = [
  {
    name: 'Nails',
    details: [
      'Manicure 10$',
      'Pedicure 11$',
      'Manicure french 14$',
      'Pedicure french 15$',
      'Manicure with gel 20$',
      'Pedicure with gel 25$',
      'Manicure with gel polish 30$',
      'Pedicure with gel polish 35$',
    ],
  },
  {
    name: 'Hair',
    details: [
      {
        subcategory: 'Basic',
        options: [
          'Brushing 12$',
          'Haircut 35$',
          'Bangs 15$',
          'Braids starting 10$',
          'Chignon starting 20$',
        ],
      },
      {
        subcategory: 'Color Studio',
        options: ['Highlights 70$', 'Lowlights 50$', 'Toner 14$', 'Full color 45$', 'Retouch 30$'],
      },
      {
        subcategory: 'Treatments',
        options: ['Keratin 150$', 'Botox 100$', 'Olaplex 50$', 'Deep Conditioning 30$'],
      },
    ],
  },
  {
    name: 'Makeup',
    details: ['Eye Makeup 20$', 'Full Makeup + Contouring 70$', 'Bridal Makeup 100$'],
  },
  {
    name: 'Facial',
    details: ['Basic Facial 30$', 'Anti-aging Facial 50$', 'Hydrating Facial 40$'],
  },
];

const AppointmentForm = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (date) {
      console.log('Fetching slots for date:', date);
      axios
        .get(`http://localhost:5000/api/slots?date=${date}`)
        .then((res) => {
          const data = res.data?.slots || [];
          const extracted = Array.isArray(data)
            ? data.map((item) => (typeof item === 'string' ? item : item.time_slot || item.slot_time || item))
            : [];
          setSlots(extracted);
        })
        .catch((err) => {
          console.error(err);
          setMessage('❌ Failed to load time slots.');
          setSlots([]);
        });
    } else {
      setSlots([]);
    }
  }, [date]);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const getOptionsForService = () => {
    const serviceObj = services.find((s) => s.name === selectedService);
    if (!serviceObj) return [];

    if (typeof serviceObj.details[0] === 'string') {
      return serviceObj.details;
    }

    return serviceObj.details.flatMap((sub) =>
      sub.options.map((opt) => `${sub.subcategory} - ${opt}`)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ You must be logged in to book an appointment.');
      return;
    }

    if (!selectedOption || !selectedSlot || !selectedService || !email || !date) {
      setMessage('❌ All fields are required.');
      return;
    }

    const appointmentData = {
      email,
      service: selectedService,
      detail: selectedOption,
      date,
      time_slot: selectedSlot,
    };

    axios
      .post('http://localhost:5000/api/appointments', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMessage('✅ Appointment booked successfully!');
        setEmail('');
        setSelectedService('');
        setSelectedOption('');
        setDate('');
        setSelectedSlot('');
        setSlots([]);
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message || err.response?.data?.error || '❌ Failed to book appointment.';
        setMessage(errorMsg);
        console.error(err.response || err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
  <h2>Book Your Appointment</h2>

  <label>Email</label>
  <br />
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    placeholder="you@example.com"
    style={{ width: '100%', padding: '8px', marginBottom: 10, boxSizing: 'border-box' }}
  />

  <label>Service</label>
  <br />
  <select
    value={selectedService}
    onChange={(e) => {
      setSelectedService(e.target.value);
      setSelectedOption('');
    }}
    required
    style={{ width: '100%', padding: '8px', marginBottom: 10, boxSizing: 'border-box' }}
  >
    <option value="">Select a service</option>
    {services.map((s) => (
      <option key={s.name} value={s.name}>
        {s.name}
      </option>
    ))}
  </select>

  {selectedService && (
    <>
      <label>Choose Option</label>
      <br />
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        required
        style={{ width: '100%', padding: '8px', marginBottom: 10, boxSizing: 'border-box' }}
      >
        <option value="">Select an option</option>
        {getOptionsForService().map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </>
  )}

  <label>Date</label>
  <br />
  <input
    type="date"
    min={getMinDate()}
    value={date}
    onChange={(e) => setDate(e.target.value)}
    required
    style={{ width: '100%', padding: '8px', marginBottom: 10, boxSizing: 'border-box' }}
  />

  <label>Time Slot</label>
  <br />
  <select
    value={selectedSlot}
    onChange={(e) => setSelectedSlot(e.target.value)}
    required
    style={{ width: '100%', padding: '8px', marginBottom: 10, boxSizing: 'border-box' }}
    disabled={!slots.length}
  >
    <option value="">Select a time slot</option>
    {slots.map((slot) => (
      <option key={slot} value={slot}>
        {slot}
      </option>
    ))}
  </select>

  <button type="submit" style={{ width: '100%', padding: '10px' }}>
    Confirm Appointment
  </button>

  {message && <p style={{ marginTop: 10 }}>{message}</p>}
</form>
  );
};

export default AppointmentForm;
