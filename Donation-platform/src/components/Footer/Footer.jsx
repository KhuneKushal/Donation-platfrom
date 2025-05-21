import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Sustainable Resource Redistribution Platform</h3>
        <p>The organisation is committed to promote donation to NGO's that help people to fulfill their daily needs</p>
        
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <div className="contact-info">
          <p>102 First Floor, Gayatri Building, Orchid School Lane, Balewadi Phata, Baner, Pune-411 045, Maharashtra, India.</p>
          <p>Email: <a href="mailto:sspindia1@gmail.com">sspindia1@gmail.com</a> / <a href="mailto:connect@swayamshikshanprayog.org">connect@swayamshikshanprayog.org</a></p>
          <p>Phone: <a href="tel:+918605016700">91 8605016700</a> / <a href="tel:+919323557456">+91 9323557456</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;