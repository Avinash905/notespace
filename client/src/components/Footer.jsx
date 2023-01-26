import React from "react";

function Footer() {
  return (
    <footer className="footer flex-center">
      ©️ NoteSpace, {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
