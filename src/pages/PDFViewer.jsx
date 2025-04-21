import React, { useEffect, useRef, useState } from "react";
import "../css/PDFViewer.css"; // Import the CSS file

function PDFViewer() {
  const containerRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    let cleanup = () => {};

    (async () => {
      const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;

      // Clean any previous instance
      NutrientViewer.unload(container);

      if (container && pdfUrl) {
        NutrientViewer.load({
          container,
          document: pdfUrl,
          baseUrl: `${window.location.origin}/`, // Ensure baseUrl ends with a slash
        });
      }

      cleanup = () => {
        NutrientViewer.unload(container);
      };
    })();

    return cleanup;
  }, [pdfUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  return (
    <div className="viewer-container">
      <h1>PDF Viewer</h1>

      <label htmlFor="file-upload" className="file-upload-label">
        Upload PDF
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      <div ref={containerRef} className="viewer-frame" />
    </div>
  );
}

export default PDFViewer;
