import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MergePDF from './pages/MergePDF';
import CompressPDF from './pages/CompressPDF';
import Footer from './components/Footer';
import PDFViewer from './pages/PDFViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/merge-pdf" element={<MergePDF />} />
            <Route path="/compress-pdf" element={<CompressPDF />} />
            <Route path="/edit-pdf" element={<PDFViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
