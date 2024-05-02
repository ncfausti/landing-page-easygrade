'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

function PDFViewer() {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString();

  const [numPages, setNumPages] = useState(null);
  // Step 1: Create an array to hold the refs
  const refs = useRef([]);
  const [items, setItems] = useState([]);
  // Ensuring refs array has the same length as items array
  useEffect(() => {
    refs.current = items.map((_, i) => refs.current[i] || React.createRef());
  }, [items]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const onLoadSuccess = () => {
  //   const importPDFCanvas: HTMLCanvasElement = document.querySelector(
  //     '.import-pdf-page canvas'
  //   );
  //   const pdfAsImageSrc = importPDFCanvas.toDataURL();
  //   console.log(pdfAsImageSrc);
  // };

  console.log(items);
  console.log(refs.current);
  return (
    <div>
      Upload a PDF file to view it here:
      <Document
        file="5_math_chapter1.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            canvasRef={refs.current[index]}
          />
        ))}
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default PDFViewer;
