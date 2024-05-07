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
// import { useCompletion } from 'ai/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

import type { PDFFile, Subject } from './types';
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
  // const { completion } = useCompletion({
  //   api: '/api/completion',
  // });

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

  const handleGradeSelect = (grade) => {
    setGrade(grade);
  };

  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };

  const disableButton =
    loadedPages === 0 || loadedPages !== numPages || showSpinner;

  const [completion, setCompletion] = useState('');

  const handleCompletionChanged = (completion: string) => {
    setCompletion(completion);
  };
  return (
    <div className="flex">
      <div
        id="generate-sidebar"
        className="sidebar flex flex-col items-center justify-between w-1/5 min-h-[800px] bg-gray-100"
      >
        <div className="flex justify-evenly py-6 w-full">
          <Select onValueChange={(e) => handleGradeSelect(e)}>
            <SelectTrigger className="mx-2">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Grade</SelectItem>
              <SelectItem value="2">2nd Grade</SelectItem>
              <SelectItem value="3">3rd Grade</SelectItem>
              <SelectItem value="4">4th Grade</SelectItem>
              <SelectItem value="5">5th Grade</SelectItem>
              <SelectItem value="6">6th Grade</SelectItem>
              <SelectItem value="7">7th Grade</SelectItem>
              <SelectItem value="8">8th Grade</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => handleSubjectSelect(e)}>
            <SelectTrigger className="mx-2">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Chat
          setCompletion={handleCompletionChanged}
          text={`You are a grade ${grade} ${subject}. Generate grade ${grade} ${subject} homework questions.`}
          images={
            refs[0].current && refs[0].current.toDataURL('image/jpeg', 0.9)
          }
        />
      </div>
      <div id="generate-main" className="w-3/5">
        <div className="Example__container">
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
                    containerWidth
                      ? Math.min(containerWidth, maxWidth)
                      : maxWidth
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
        Completion:{' '}
        <div className="drop-shadow-lg ">
          <p className="bg-white m-12 p-3 drop-shadow-lg">
            {completion &&
              `Name: _______________ Section : ________________  Date: ___________________`}
            <br className="leading-5"></br>
            {completion}
          </p>
        </div>
      </div>
    </div>
  );
}
