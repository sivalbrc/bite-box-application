import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <h2 className="footer-logo">BiteBox</h2>
          <p className="footer-tagline">
            Fresh meals, fast delivery, and flavors you'll love every day.
          </p>

          <div className="social-icons">
            <a href="/" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link to="/home">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>

          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Hyderabad, India</span>
          </div>

          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>support@bitebox.com</span>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p className="newsletter-text">
            Subscribe to get updates on offers and new dishes.
          </p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} BiteBox. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
