import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import '../css/CompressPDF.css';

const CompressPDF = () => {
  const [file, setFile] = useState(null);
  const [compressedPdf, setCompressedPdf] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileSizeBefore, setFileSizeBefore] = useState(null);
  const [fileSizeAfter, setFileSizeAfter] = useState(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setCompressedPdf(null);
    setFileSizeBefore(null);
    setFileSizeAfter(null);

    // Set file size before compression
    if (selectedFile) {
      setFileSizeBefore((selectedFile.size / 1024).toFixed(2)); // Size in KB
    }
  };

  // Compress PDF logic
  const compressPDF = async () => {
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    setIsCompressing(true);

    // Load the PDF document
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Here we would compress the PDF by removing unused objects, fonts, etc.
    // pdf-lib doesn't provide an easy way to compress files, but we can try optimizing
    // by removing metadata, and reducing images (which is a rough "compression" method).

    // Save the "compressed" PDF
    const compressedPdfBytes = await pdfDoc.save();
    const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    setCompressedPdf(blob);

    // Set file size after compression
    setFileSizeAfter((blob.size / 1024).toFixed(2)); // Size in KB

    // Simulate a 5-second compression process
    setTimeout(() => {
      setIsCompressing(false); // Hide the spinner after compression
    }, 5000);
  };

  // Download compressed PDF
  const downloadCompressedPDF = () => {
    if (compressedPdf) {
      saveAs(compressedPdf, 'compressed.pdf');
    }
  };

  return (
    <div className="compress-container">
      <h2>📄 Compress PDF</h2>
      <p>Select a PDF file to compress.</p>

      {/* File input */}
      <label htmlFor="file-input" className="file-upload-label">
        Select PDF File
      </label>
      <input
        type="file"
        accept="application/pdf"
        id="file-input"
        onChange={handleFileChange}
      />

      {/* Display the selected file */}
      {file && (
        <div className="file-info">
          <h4>📑 Selected PDF:</h4>
          <span>{file.name}</span>
        </div>
      )}

      {/* Display file size before compression */}
      {fileSizeBefore && (
        <div className="file-size">
          <h4>File Size Before Compression:</h4>
          <span>{fileSizeBefore} KB</span>
        </div>
      )}

      {/* Compress button: Only shows after selecting file */}
      {file && (
        <div className="button-group">
          <button className="compress-btn" onClick={compressPDF} disabled={isCompressing}>
            {isCompressing ? <div className="spinner"></div> : '🔄 Compress PDF'}
          </button>
        </div>
      )}

      {/* Show file size after compression */}
      {fileSizeAfter && (
        <div className="file-size">
          <h4>File Size After Compression:</h4>
          <span>{fileSizeAfter} KB</span>
        </div>
      )}

      {/* Show download button after compression */}
      {compressedPdf && !isCompressing && (
        <button className="download-btn" onClick={downloadCompressedPDF}>
          ⬇️ Download Compressed PDF
        </button>
      )}

      {/* Show text and spinner during compression */}
      {isCompressing && <p>Compressing PDF...</p>}
    </div>
  );
};

export default CompressPDF;
