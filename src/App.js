import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';

import MergePDF from './pages/MergePDF';
import CompressPDF from './pages/CompressPDF';
import Footer from './components/Footer';





function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/merge-pdf" element={<MergePDF />} />
        <Route path="/compress-pdf" element={<CompressPDF />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
