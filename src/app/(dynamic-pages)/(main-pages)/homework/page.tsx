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
import { CompleteIcon } from '@/components/ui/Icons/Complete';
import { InsertIcon } from '@/components/ui/Icons/Insert';
import { EditIcon } from '@/components/ui/Icons/Edit';
import './homework.css';
import { subjects } from './constants';

// export const metadata: Metadata = {
//   title: 'Homework Lab',
//   description:
//     'TeacherAssist Homework Lab - tools for teachers and students to create and manage homework assignments.',
// };
import { PDFPreview } from './pdf-preview';
import type { PDFFile, Subject } from '@/components/pdf/types';
const resizeObserverOptions = {};

const DocumentPreview = ({ text }) => {
  return (
    <div className="document-preview">
      <div id="printableDiv" className="page bg-muted">
        {text.split('\n').map((line, index) => (
          <p key={index} className="">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
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
    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    console.log('numpages: ', nextNumPages, numPages);
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
  const [text, setText] = useState(`Hello world.\n Here is your homework.\n`);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

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
                      Choose the interface that best suits your teaching task.
                      {/* You can provide: a simple prompt to complete, starting and
                      ending text to insert a completion within, or some text
                      with instructions to edit it. */}
                    </HoverCardContent>
                  </HoverCard>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger disabled value="complete">
                      <span className="sr-only">Complete</span>
                      <CompleteIcon />
                    </TabsTrigger>
                    <TabsTrigger disabled value="insert">
                      <span className="sr-only">Insert</span>
                      <InsertIcon />
                    </TabsTrigger>
                    <TabsTrigger value="edit">
                      <span className="sr-only">Edit</span>
                      <EditIcon />
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
                            onChange={handleTextChange}
                            value={completion}
                          />
                          <textarea
                            className="text-area"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Enter text here"
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
                      <div
                        id="pdf-preview-container"
                        className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]"
                      >
                        {/* <DocumentPreview text={completion} /> */}
                        <PDFPreview
                          questions={['Hello world', 'how are you?']}
                        />
                      </div>
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
