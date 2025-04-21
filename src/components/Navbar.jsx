import React from 'react';
import { Link } from 'react-router-dom';
import '../css//Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>PDF Toolkit</Link></div>
      <ul className="navbar-links">
        <li className="dropdown">
          <span>Online Tools ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/merge-pdf">Merge PDF</Link></li>
            <li><Link to="/compress-pdf">Compress PDF</Link></li>
            <li><Link to="/edit-pdf">Edit Pdf</Link></li>
            
          </ul>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
