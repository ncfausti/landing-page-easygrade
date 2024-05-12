'use client';
import React, { useCallback, useRef, useState } from 'react';
import FileUpload from '@/components/ui/FileUpload';
import Image from 'next/image';
import { pdfjs, Document, Thumbnail } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};
import type { PDFDocumentProxy } from 'pdfjs-dist';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/Textarea';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { CodeViewer } from './components/code-viewer';
import { MaxLengthSelector } from './components/maxlength-selector';
import { PresetActions } from './components/preset-actions';
import { PresetSave } from './components/preset-save';
import { PresetShare } from './components/preset-share';
import { TemperatureSelector } from './components/temperature-selector';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Chat from '@/components/ui/Streaming/Chat';
import './homework.css';
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
// export const metadata: Metadata = {
//   title: 'Homework Lab',
//   description:
//     'TeacherAssist Homework Lab - tools for teachers and students to create and manage homework assignments.',
// };
import type { PDFFile, Subject } from '@/components/pdf/types';
const resizeObserverOptions = {};

export default function PlaygroundPage() {
  const [grade, setGrade] = useState(5);
  const [subject, setSubject] = useState<Subject>('Math');
  const [completion, setCompletion] = useState('');
  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>(0);
  const [loadedPages, setLoadedPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  console.log(containerWidth);
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(files): void {
    setNumPages(0);
    setLoadedPages(0);
    // alert(files);
    // const { files } = event.target;

    // console.log(file);
    // setFile(file);
    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    console.log('numpages: ', nextNumPages, numPages);
    // alert('success');
    setNumPages(nextNumPages);
  }

  const handleGradeSelect = (grade) => {
    console.log(grade);
    setGrade(grade);
  };
  const handleSubjectSelect = (subject) => {
    console.log(subject);
    setSubject(subject);
  };

  const widthToSendToOpenAI = 500;
  const MAX_PAGES = 50;
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const refs = Array.from({ length: MAX_PAGES }, () => useRef(null));

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/playground-light.png"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/playground-dark.png"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Homework</h2>
          <div className="hidden ml-auto flex w-full space-x-2 sm:justify-end">
            {/* <PresetSelector presets={presets} /> */}
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="edit" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_400px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Mode
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the interface that best suits your task. You can
                      provide: a simple prompt to complete, starting and ending
                      text to insert a completion within, or some text with
                      instructions to edit it.
                    </HoverCardContent>
                  </HoverCard>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger disabled value="complete">
                      <span className="sr-only">Complete</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger disabled value="insert">
                      <span className="sr-only">Insert</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                          fill="currentColor"
                        ></path>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger value="edit">
                      <span className="sr-only">Edit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="4"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <path
                          d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </TabsTrigger>
                  </TabsList>
                </div>
                {/* Subject Select */}
                <Select onValueChange={(e) => handleSubjectSelect(e)}>
                  <SelectTrigger className="mx-2">
                    <SelectValue placeholder={subject} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Grade level select */}
                <TemperatureSelector
                  defaultValue={[grade]}
                  onChangeCallback={handleGradeSelect}
                />
                <MaxLengthSelector defaultValue={[256]} />
                <Chat
                  setCompletion={setCompletion}
                  text={`You are a grade ${grade} ${subject}. Generate grade ${grade} ${subject} homework questions.`}
                  images={
                    refs[0].current &&
                    refs[0].current.toDataURL('image/jpeg', 0.9)
                  }
                />
                {/* <TopPSelector defaultValue={[0.9]} /> */}
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <Textarea
                      placeholder="Write a homework for a 5th grade student on the topic of 'The Solar System'."
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                      value={completion}
                    />
                    <div className="flex items-center space-x-2">
                      <Chat
                        setCompletion={setCompletion}
                        text={`You are a grade ${grade} ${subject}. Generate grade ${grade} ${subject} homework questions.`}
                        images={
                          refs[0].current &&
                          refs[0].current.toDataURL('image/jpeg', 0.9)
                        }
                      />
                      <div className="Example__container">
                        <FileUpload onFileChange={onFileChange} />
                        <div
                          className="border rounded-md Example__container__document bg-gray-100"
                          ref={setContainerRef}
                        >
                          <Document
                            file={file}
                            onLoadProgress={({ loaded, total }) =>
                              console.log(loaded, total)
                            }
                            onLoadSuccess={onDocumentLoadSuccess}
                            options={options}
                          >
                            {Array.from(new Array(numPages), (el, index) => (
                              <Thumbnail
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                className={
                                  selectedPages.includes(index + 1)
                                    ? 'selected-page'
                                    : ''
                                }
                                canvasRef={refs[index]}
                                width={widthToSendToOpenAI}
                                onRenderSuccess={() =>
                                  setLoadedPages((prev) => prev + 1)
                                }
                                onItemClick={({
                                  dest,
                                  pageIndex,
                                  pageNumber,
                                }) =>
                                  setSelectedPages((prev) => {
                                    console.log(dest, pageIndex);
                                    if (prev.includes(pageNumber)) {
                                      return prev.filter(
                                        (p) => p !== pageNumber
                                      );
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
                      <Button>Generate</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="Write a lesson plan for a 5th grade class on the topic of 'The Solar System'."
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <Button>Submit</Button> */}

                      <Chat
                        setCompletion={setCompletion}
                        text={`You are a grade ${grade} ${subject}. Generate grade ${grade} ${subject} homework questions based on all images provided.`}
                        images={
                          refs[0].current &&
                          refs[0].current.toDataURL('image/jpeg', 0.9)
                        }
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Response:</Label>
                          <Textarea
                            id="input"
                            placeholder="Write a homework assignment about..."
                            className="flex-1"
                            value={completion}
                          />
                          <div className="Example__container">
                            <div className="hidden Example__container__load">
                              <input onChange={onFileChange} type="file" />
                            </div>
                            <div
                              className="border rounded-md Example__container__document bg-gray-100"
                              ref={setContainerRef}
                            >
                              <Document
                                file={file}
                                onLoadProgress={({ loaded, total }) =>
                                  console.log(loaded, total)
                                }
                                onLoadSuccess={onDocumentLoadSuccess}
                                options={options}
                              >
                                {Array.from(
                                  new Array(numPages),
                                  (el, index) => (
                                    <Thumbnail
                                      key={`page_${index + 1}`}
                                      pageNumber={index + 1}
                                      className={
                                        selectedPages.includes(index + 1)
                                          ? 'selected-page'
                                          : ''
                                      }
                                      canvasRef={refs[index]}
                                      width={widthToSendToOpenAI}
                                      onRenderSuccess={() =>
                                        setLoadedPages((prev) => prev + 1)
                                      }
                                      onItemClick={({
                                        dest,
                                        pageIndex,
                                        pageNumber,
                                      }) =>
                                        setSelectedPages((prev) => {
                                          console.log(dest, pageIndex);
                                          if (prev.includes(pageNumber)) {
                                            return prev.filter(
                                              (p) => p !== pageNumber
                                            );
                                          }
                                          return [...prev, pageNumber];
                                        })
                                      }
                                    />
                                  )
                                )}
                              </Document>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          {/* <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          /> */}
                          <FileUpload onFileChange={onFileChange} />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <Button>Submit</Button> */}

                      {/* <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
