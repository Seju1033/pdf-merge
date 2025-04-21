import React from 'react';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Edit, Merge & Convert PDFs Seamlessly</h1>
        <p>All-in-one online toolkit to manage your PDFs — fast, simple, and secure.</p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>

        <p className="note">No signup required · Free to use · Works in your browser</p>
      </div>
    </section>
  );
};

export default Hero;
