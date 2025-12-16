import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-box">

        <div className="contact-info">
          <h3>Contact Us</h3>
          <p><strong>Name:</strong> Glamour Beauty Salon</p>
          <p><strong>Email:</strong> serenacostantine05@icloud.com</p>
          <p><strong>Phone Number:</strong>+961 81-044 596</p>
          <p>
            <strong>Location:</strong>{' '}
            <a
              href="https://www.google.com/maps/place/Your+Salon+Address"
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              View on Map
            </a>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 Glamour Beauty Salon
      </div>
    </footer>
  );
};

export default Footer;
