import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import '../css/MergePDF.css';

const MergePDF = () => {
  const [files, setFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMergedPdf(null);
  };

  const moveFile = (index, direction) => {
    const updatedFiles = [...files];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= files.length) return;

    const temp = updatedFiles[newIndex];
    updatedFiles[newIndex] = updatedFiles[index];
    updatedFiles[index] = temp;

    setFiles(updatedFiles);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert('Please select at least two PDF files.');
      return;
    }

    setIsMerging(true);

    const mergedDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedDoc.addPage(page));
    }

    const mergedPdfBytes = await mergedDoc.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    setMergedPdf(blob);

    setTimeout(() => {
      setIsMerging(false); // hide the spinner after 5 seconds
    }, 5000);
  };

  const downloadMergedPDF = () => {
    if (mergedPdf) {
      saveAs(mergedPdf, 'merged.pdf');
    }
  };

  return (
    <div className="merge-container">
      <h2>🔀 Merge PDF Files</h2>
      <p>Choose PDF files, set the order, and preview before downloading.</p>

      {/* File input */}
      <label htmlFor="file-input" className="file-upload-label">
        Select Files
      </label>
      <input
        type="file"
        accept="application/pdf"
        multiple
        id="file-input"
        onChange={handleFileChange}
      />

      {/* Display selected files */}
      {files.length > 0 && (
        <div className="file-list">
          <h4>📑 Selected PDFs:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <span>{index + 1}. {file.name}</span>
                <div>
                  <button onClick={() => moveFile(index, -1)} disabled={index === 0}>
                    ⬆️
                  </button>
                  <button onClick={() => moveFile(index, 1)} disabled={index === files.length - 1}>
                    ⬇️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Merge Button: Only shows after selecting files */}
      {files.length > 0 && (
        <div className="button-group">
          <button className="merge-btn" onClick={mergePDFs} disabled={isMerging}>
            {isMerging ? <div className="spinner"></div> : '🔀 Merge PDFs'}
          </button>
        </div>
      )}

      {/* Show download button after merging */}
      {mergedPdf && !isMerging && (
        <button className="download-btn" onClick={downloadMergedPDF}>
          ⬇️ Download Merged PDF
        </button>
      )}

      {/* Show text and spinner during merging */}
      {isMerging && <p>Uploading PDF...</p>}
    </div>
  );
};

export default MergePDF;
