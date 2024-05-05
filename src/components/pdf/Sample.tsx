'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Spinner from './Spinner';
import './Sample.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
// import { set } from 'nprogress';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

type PDFFile = string | File | null;
type Subject =
  | 'English'
  | 'Math'
  | 'Social'
  | 'Science'
  | 'EVS'
  | 'Chemistry'
  | 'Physics'
  | 'Biology'
  | 'ICT'
  | 'History'
  | 'Geography'
  | 'Civics';

const subjects = [
  'English',
  'Math',
  'Social',
  'Science',
  'EVS',
  'Chemistry',
  'Physics',
  'Biology',
  'ICT',
  'History',
  'Geography',
  'Civics',
];

export default function Sample() {
  const [file, setFile] = useState<PDFFile>();
  const [grade, setGrade] = useState<number>(1);
  const [subject, setSubject] = useState<Subject>('English');
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

  const maxWidth = 800;
  const MAX_PAGES = 50;
  const refs = Array.from({ length: MAX_PAGES }, () => useRef(null));
  const [gptResponseJson, setGptResponseJson] = useState({ choices: [] });
  const [showSpinner, setShowSpinner] = useState(false);
  const handleClick = async (grade: string, subject: string) => {
    setShowSpinner(true);
    console.log(grade, subject);
    const gptResponse = await fetch(
      `/api/generate?grade=${grade}&subject=${subject}`,
      {
        method: 'POST',
        body: refs[0].current.toDataURL('image/jpeg', 0.9),
      }
    );
    const gptResponseJson = await gptResponse.json();
    console.log(gptResponseJson);
    setGptResponseJson(gptResponseJson);
    setShowSpinner(false);
  };

  const handleGradeSelect = (e) => {
    console.log(e.target.value);
    setGrade(e.target.value);
  };

  const handleSubjectSelect = (e) => {
    console.log(e.target.value);
    setSubject(e.target.value);
  };

  const disableButton =
    loadedPages === 0 || loadedPages !== numPages || showSpinner;

  return (
    <div>
      <div className="Example">
        <div className="Example__container">
          <div>
            <select className="p-3 m-3" onChange={(e) => handleGradeSelect(e)}>
              <option value="1">1st Grade</option>
              <option value="2">2nd Grade</option>
              <option value="3">3rd Grade</option>
              <option value="4">4th Grade</option>
              <option value="5">5th Grade</option>
              <option value="6">6th Grade</option>
              <option value="7">7th Grade</option>
              <option value="8">8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>

            <select
              className="p-3 m-3"
              onChange={(e) => handleSubjectSelect(e)}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
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
                  width={
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
                  }
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
        {!numPages && <p>Load a PDF to get started</p>}

        {showSpinner && disableButton && <Spinner />}
        {!disableButton && (
          <div>
            <button
              disabled={disableButton}
              className={'btn bg-white border-2 p-3 rounded-xl border-black'}
              onClick={() => handleClick(String(grade), subject)}
            >
              Generate Homework
            </button>
          </div>
        )}
        {gptResponseJson.choices.length > 0 && (
          <code className="bg-white p-3 m-3">
            {' '}
            {gptResponseJson.choices.map((c) => c.message.content)}
          </code>
        )}
      </div>
    </div>
  );
}
