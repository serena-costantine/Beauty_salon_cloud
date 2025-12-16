import React from 'react';

function About() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI' }}>
      <h1>About BeautySalon</h1>
      <p>
        Welcome to BeautySalon — your elegant destination for high-end beauty services.
        Our experts offer premium care in a relaxing, luxurious environment.
      </p>
      <h2>Contact Us</h2>
      <p>Email: hello@beautysalon.com</p>
      <p>Phone: +961-1-234-567</p>
      <iframe
        title="Salon Map"
        src="https://www.google.com/maps/embed?...your_map_link_here..."
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: '12px', marginTop: '20px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default About;
