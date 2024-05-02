'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Sample.css';
import { parseBody } from '@/lib/utils';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { set } from 'nprogress';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>(0);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const MAX_PAGES = 50;
  const refs = Array.from({ length: MAX_PAGES }, () => useRef(null));

  // const generateHomeworks = async () => {
  //   const response = await fetch('/api/generate', {
  //     method: 'POST',
  //     body: refs[0].current.toDataURL('image/jpeg', 0.9),
  //   });
  //   console.log(response);
  //   return response;
  // };

  // const [homeworks, setHomeworks] = useState('');
  const [gptResponseJson, setGptResponseJson] = useState({ choices: [] });

  // gptResponseJson.choices.map((c) => c.message.content);

  const handleClick = async () => {
    const gptResponse = await fetch('/api/generate', {
      method: 'POST',
      body: refs[0].current.toDataURL('image/jpeg', 0.9),
    });
    const gptResponseJson = await gptResponse.json();
    console.log(gptResponseJson);
    setGptResponseJson(gptResponseJson);

    // console.log(response.json());
    // setHomeworks(response.json());
  };

  return (
    <div>
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from pdf:</label>{' '}
            <input onChange={onFileChange} type="file" />
          </div>
          <div className="Example__container__document" ref={setContainerRef}>
            <Document
              file={file}
              onLoadProgress={({ loaded, total }) => console.log(loaded, total)}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  canvasRef={refs[index]}
                  width={400}
                  onRenderSuccess={() => setLoadedPages((prev) => prev + 1)}
                />
              ))}
            </Document>
          </div>
        </div>
        <div>
          <h1>
            Loaded Pages: {loadedPages} / {numPages}
          </h1>
        </div>
        <button
          disabled={loadedPages === 0 || loadedPages !== numPages}
          className={`btn bg-white border-2 p-3 rounded-xl border-black ${!numPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          onClick={handleClick}
        >
          Generate Homework
        </button>
        {numPages && (
          <code className="bg-white p-3 m-3">
            {' '}
            {gptResponseJson.choices.map((c) => c.message.content)}
          </code>
        )}
      </div>
    </div>
  );
}
