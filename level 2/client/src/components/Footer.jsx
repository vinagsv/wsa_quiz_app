import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
