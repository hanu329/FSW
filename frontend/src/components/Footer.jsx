import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <style>{`
        .footer {
          background: #111;
          color: white;
          padding: 30px 20px;
          margin-top: 40px;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-section {
          flex: 1;
          min-width: 200px;
        }

        .footer h3 {
          margin-bottom: 10px;
          color: teal;
        }

        .footer p, .footer a {
          font-size: 14px;
          color: #ccc;
          text-decoration: none;
          display: block;
          margin: 5px 0;
        }

        .footer a:hover {
          color: teal;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 20px;
          border-top: 1px solid #333;
          padding-top: 10px;
          font-size: 13px;
          color: #aaa;
        }
      `}</style>

      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h3>MyApp</h3>
          <p>This is a dummy footer for your project.</p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Services</a>
          <a href="/">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: example@mail.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} MyApp | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;