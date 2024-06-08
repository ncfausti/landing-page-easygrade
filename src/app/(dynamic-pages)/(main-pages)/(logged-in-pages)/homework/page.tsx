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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { CodeViewer } from './components/code-viewer';
import { QuestionRatioSelector } from './components/question-ratio-selector';
import { PresetActions } from './components/preset-actions';
import { PresetSave } from './components/preset-save';
import { PresetShare } from './components/preset-share';
import { GradeSelector } from './components/grade-selector';
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

// const metadata: Metadata = {
//   title: 'Homework Lab',
//   description:
//     'AssistTeacher Homework Lab - Tools for teachers and students to create and manage homework assignments.',
// };
import { PDFPreview } from './pdf-preview';
import type { PDFFile, Subject } from '@/components/pdf/types';
import DifficultySelector from './components/difficulty-selector';
import { Textarea } from '@/components/ui/Textarea';
const resizeObserverOptions = {};

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Page() {
  const [grade, setGrade] = useState(5);
  const [subjNum, setSubjNum] = useState(7);
  const [mcqNum, setMcqNum] = useState(3);
  const [subject, setSubject] = useState<Subject>('Math');
  const [completion, setCompletion] = useState('');
  const [isCompletionLoading, setIsCompletionLoading] = useState(false);
  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>(0);
  const [, setLoadedPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [, setContainerWidth] = useState<number>();
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function setCompletionCallback(completionText: string, isLoading: boolean) {
    setCompletion(completionText);
    setIsCompletionLoading(isLoading);
  }

  function onFileChange(files): void {
    setNumPages(0);
    // setLoadedPages(0);
    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const handleGradeSelect = (grade) => {
    setGrade(grade);
  };
  const handleSubjectSelect = (subject) => {
    setSubject(subject);
  };
  const handleMCQSelect = (mcqNum: number) => {
    setMcqNum(mcqNum);
  };
  const handleSubjectiveSelect = (subjNum: number) => {
    setSubjNum(subjNum);
  };

  const widthToSendToOpenAI = 400;
  const MAX_PAGES = 50;
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const refs = Array.from({ length: MAX_PAGES }, () => useRef(null));

  const trycatch = (fn, arg) => {
    try {
      return fn(arg);
    } catch (e) {
      return [];
    }
  };

  // if ref.current is not null, map it to a dataURL
  const allImages = refs
    .filter((ref) => ref.current)
    .map((ref) => {
      if (ref.current) {
        return ref.current.toDataURL('image/jpeg', 0.7);
      }
    });

  const totalQuestions = mcqNum + subjNum;
  const hwGenerationPrompt = `You are a grade ${grade} ${subject}. GENERATE
  GRADE ${grade} ${subject} HOMEWORK QUESTIONS and ANSWERS based on the
  attached images.

  There should be exactly ${totalQuestions} questions and answers returned.
  ${mcqNum} questions should be multiple choice. ${subjNum} questions
  should be short answer. For math questions use appropriate
  symbols, not words. E.g. "+" not "plus" and "-" not "minus".

  Rules:
  DO NOT INCLUDE ANY REFERENCES TO IMAGES IN THE QUESTIONS OR ANSWERS.
  The format should be JSON.
  DO NOT RETURN ANYTHING ELSE, ONLY THE JSON OBJECT.
  JSON object format:
  [
      {
        "question": "What is the capital of France?",
        "answer": "Paris",
        "type": "multiple choice",
        "choices": ["Paris", "London", "Berlin", "Madrid"]
      },
      {
        "question": "150 + 300",
        "answer": "450",
        "type": "short answer",
        "choices": []
      }
    ]
  `;

  // console.log(completion);
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
                <GradeSelector
                  defaultValue={[grade]}
                  onChangeCallback={handleGradeSelect}
                />
                <QuestionRatioSelector
                  defaultValue={[7]}
                  maxValue={20}
                  title="No. of MCQs:"
                  onChangeCallback={handleMCQSelect}
                />
                <QuestionRatioSelector
                  defaultValue={[3]}
                  maxValue={10}
                  title="No. of subjective:"
                  onChangeCallback={handleSubjectiveSelect}
                />
                <DifficultySelector />
                {isCompletionLoading}
                <Chat
                  setCompletion={setCompletionCallback}
                  text={hwGenerationPrompt}
                  images={allImages}
                />
              </div>
              <div className="md:order-1">
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Upload preview:</Label>
                          {/* <Textarea
                            id="input"
                            placeholder="Question and answers will appear here."
                            className="flex-1"
                            // onChange={handleTextChange}
                            value={completion.replace(/[^a-zA-Z0-9\s]/g, '')}
                          /> */}
                          {/* <textarea
                            className="text-area"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Enter text here"
                          /> */}
                          <div className="Example__container min-h-[400px] lg:min-h-[700px] ">
                            <div className="hidden Example__container__load min-h-[400px] lg:min-h-[700px] ">
                              <input onChange={onFileChange} type="file" />
                            </div>
                            <div
                              className="border rounded-md Example__container__document bg-gray-100 min-h-[400px] lg:min-h-[700px] "
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
                          {selectedPages.length === 1 && (
                            <span>{`${selectedPages.length} page selected`}</span>
                          )}
                          {selectedPages.length >= 2 && (
                            <span>{`${selectedPages.length} pages selected`}</span>
                          )}
                        </div>
                      </div>
                      <div
                        id="pdf-preview-container"
                        className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]"
                      >
                        {!isCompletionLoading && (
                          <PDFPreview
                            questions={trycatch(JSON.parse, completion)}
                          />
                        )}
                        {isCompletionLoading && (
                          <Textarea
                            id="input"
                            className="min-h-[400px] lg:min-h-[700px]"
                            placeholder="No homework questions generated yet."
                            // onChange={handleTextChange}
                            value={completion}
                          />
                        )}
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
