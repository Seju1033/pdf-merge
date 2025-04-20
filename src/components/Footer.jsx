import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        textAlign: 'center',
        borderTop: '2px solid #34495e',
        fontSize: '14px'
      }}
    >
      <p>&copy; {new Date().getFullYear()} PDF Editor App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
