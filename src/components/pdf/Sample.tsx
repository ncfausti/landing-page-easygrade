'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Spinner from './Spinner';
import './Sample.css';
import Chat from '../ui/Streaming/Chat';
import type { PDFDocumentProxy } from 'pdfjs-dist';
// import { set } from 'nprogress';
import { useCompletion } from 'ai/react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
// import { Homework } from '@/components/pdf/create/Homework';
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
  const { completion } = useCompletion({
    api: '/api/completion',
  });

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNumPages(0);
    setLoadedPages(0);
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
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const refs = Array.from({ length: MAX_PAGES }, () => useRef(null));
  const [gptResponseJson, setGptResponseJson] = useState({ choices: [] });
  const [showSpinner, setShowSpinner] = useState(false);
  const handleClick = async (grade: string, subject: string) => {
    setShowSpinner(true);
    const gptResponse = await fetch(
      `/api/generate?grade=${grade}&subject=${subject}`,
      {
        method: 'POST',
        body: refs[0].current.toDataURL('image/jpeg', 0.9),
      }
    );
    const gptResponseJson = await gptResponse.json();
    setGptResponseJson(gptResponseJson);
    setShowSpinner(false);
  };

  const handleGradeSelect = (e) => {
    setGrade(e.target.value);
  };

  const handleSubjectSelect = (e) => {
    setSubject(e.target.value);
  };

  const disableButton =
    loadedPages === 0 || loadedPages !== numPages || showSpinner;

  return (
    <div className="Example">
      <div className="Example__container">
        <div>
          <select
            className="p-3 m-3 rounded-md"
            onChange={(e) => handleGradeSelect(e)}
          >
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
            className="p-3 m-3 rounded-md"
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
          {/* <label htmlFor="file">Load from pdf:</label>{' '} */}
          <input onChange={onFileChange} type="file" />
        </div>
        <div
          className="border rounded-md Example__container__document bg-gray-100"
          ref={setContainerRef}
        >
          <Document
            file={file}
            onLoadProgress={({ loaded, total }) => console.log(loaded, total)}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Thumbnail
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className={
                  selectedPages.includes(index + 1) ? 'selected-page' : ''
                }
                canvasRef={refs[index]}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                onRenderSuccess={() => setLoadedPages((prev) => prev + 1)}
                onItemClick={({ dest, pageIndex, pageNumber }) =>
                  setSelectedPages((prev) => {
                    console.log(dest, pageIndex);
                    if (prev.includes(pageNumber)) {
                      return prev.filter((p) => p !== pageNumber);
                    }
                    return [...prev, pageNumber];
                  })
                }
              />
            ))}
          </Document>
        </div>
      </div>
      <div>
        Loaded Pages: {loadedPages} / {numPages}
      </div>
      {!numPages && <p>Load a PDF to get started</p>}
      {selectedPages.length > 0 && (
        <div>
          <h1>Selected Pages: {selectedPages.join(', ')}</h1>
        </div>
      )}
      {showSpinner && disableButton && <Spinner />}
      {!disableButton && (
        <div>
          <button
            disabled={disableButton}
            className={
              'hidden btn bg-white border-2 p-3 rounded-xl border-black'
            }
            onClick={() => handleClick(String(grade), subject)}
          >
            Generate Homework
          </button>
        </div>
      )}
      {gptResponseJson.choices.length > 0 && (
        <p className="bg-white p-3 m-3  ">
          {' '}
          {gptResponseJson.choices.map((c) => c.message.content)}
        </p>
      )}
      Completion: <div className="drop-shadow-lg ">{completion}</div>
      <Chat
        text={`You are a grade ${grade} ${subject}. Generate grade ${grade} ${subject} homework questions.`}
        images={refs[0].current && refs[0].current.toDataURL('image/jpeg', 0.9)}
      />
    </div>
  );
}
