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
import { subjects } from '@/constants';
import { MAIN_PROMPT } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { PDFPreview } from './pdf-preview';
import type { PDFFile, Subject } from '@/components/pdf/types';
import DifficultySelector from './components/difficulty-selector';
import Loading from '@/components/Loading';
const resizeObserverOptions = {};
import { CourseStudents, Question } from '@/types';
import QuestionForm from './components/question-form';
// import QuestionList from './components/question-list';
// import AddQuestionModal from './components/add-question-modal';
import { createAllAssignmentsForCourseAction } from '@/data/user/assignments';
import { toast } from 'react-hot-toast';
import { CourseSelectDropdown } from './components/course-select-dropdown';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentsByIdsFrontEnd } from '@/utils/supabase-queries';
import { supabaseUserClientComponentClient } from '@/supabase-clients/supabaseUserClientComponentClient';

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Page() {
  const [grade, setGrade] = useState(8);
  const [subjNum, setSubjNum] = useState(0);
  const [mcqNum, setMcqNum] = useState(3);
  const [subject, setSubject] = useState<Subject>('Math');
  const [courseId, setCourseId] = useState<number>(-1);
  const [courseName, setCourseName] = useState<string>('');
  const [insertedQuestions, setInsertedQuestions] = useState<Question[]>([]);
  const [completion, setCompletion] = useState('');
  const [isCompletionLoading, setIsCompletionLoading] = useState(false);
  const [file, setFile] = useState<PDFFile>();
  const [numPages, setNumPages] = useState<number>(0);
  const [, setLoadedPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [, setContainerWidth] = useState<number>();
  const toastRef = useRef<string | null>(null);
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  const [enrollments, setEnrollments] = useState<CourseStudents[]>([]);
  const [studentIds, setStudentIds] = useState<number[]>([-1]);

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

  const config = {
    grade,
    subject,
    totalQuestions,
    mcqNum,
    subjNum,
  };
  const hwGenerationPrompt = MAIN_PROMPT(config);
  const handleCourseIdSelect = async (courseId: string, courseName: string) => {
    setCourseId(parseInt(courseId));
    setCourseName(courseName);
  };

  const setEnrollmentsCallback = (enrollments) => {
    setEnrollments(enrollments);
    setStudentIds(enrollments.map((enrollment) => enrollment.student_ids));
  };

  const handleCreateAllHomeworks = async (
    assignment_template_id: string,
    course_id: number,
    question_ids: number[] = [],
    subject
  ) => {
    if (course_id === -1) {
      return;
    }
    try {
      console.log(subject);
      const toastId = toast.loading('Creating assignments for students');
      toastRef.current = toastId;
      await createAllAssignmentsForCourseAction({
        assignment_template_id,
        course_id,
        question_ids,
        subject,
      });
      toast.success(`New assignments created`, {
        id: toastRef.current,
      });
      toastRef.current = null;
    } catch (e) {
      toast.error('Failed to add assignments', { id: toastRef.current });
      toastRef.current = null;
    }
  };

  const [courseStudents]: CourseStudents[] = enrollments.filter(
    (enrollment) => enrollment.course_id === courseId
  );

  const { data: students } = useQuery(
    ['students', courseId, studentIds],
    () =>
      fetchStudentsByIdsFrontEnd(
        supabaseUserClientComponentClient,
        courseStudents.student_ids
      ),
    {
      enabled: !!courseId && !!studentIds && !!courseStudents,
    }
  );

  const [assignmentTemplateId] = useState(uuidv4());

  console.log('trycatch: ', trycatch(JSON.parse, completion));

  function handleFormAddQuestion(newQuestions: Question[]) {
    setInsertedQuestions((prevQuestions) => [
      ...prevQuestions,
      ...newQuestions,
    ]);
  }

  function handleFormUpdateQuestion(updatedQuestion: Question) {
    setInsertedQuestions((prevQuestions) => [
      ...prevQuestions.map((question) =>
        question.question_id === updatedQuestion.question_id
          ? { ...question, ...updatedQuestion }
          : question
      ),
    ]);
  }

  function handleFormDeleteQuestion(questionId: number) {
    setInsertedQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.question_id !== questionId)
    );
  }
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
                  <TabsList className="grid grid-cols-2">
                    {/* <TabsTrigger value="insert">
                      <span className="sr-only">Insert</span>
                      <InsertIcon />
                    </TabsTrigger> */}
                    <TabsTrigger value="edit">
                      <EditIcon />
                      <span className="">Edit</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                      <CompleteIcon />
                      <span className="">Preview</span>
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
                  defaultValue={[mcqNum]}
                  maxValue={20}
                  title="No. of MCQs:"
                  onChangeCallback={handleMCQSelect}
                />
                <QuestionRatioSelector
                  defaultValue={[subjNum]}
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
                  totalQuestions={totalQuestions}
                  setInsertedQuestions={handleFormAddQuestion}
                />
                <CourseSelectDropdown
                  handleCourseSelect={handleCourseIdSelect}
                  setEnrollmentsCallback={setEnrollmentsCallback}
                />

                <Button
                  variant="secondary"
                  className={courseId === -1 ? 'disabled' : ''}
                  onClick={() =>
                    handleCreateAllHomeworks(
                      assignmentTemplateId,
                      courseId,
                      insertedQuestions.map((q: Question) => q.question_id),
                      subject
                    )
                  }
                >
                  <span className="sr-only">Create all homeworks</span>
                  Create all homeworks
                </Button>
              </div>
              <div className="md:order-1">
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="h-full">
                      <div className="flex flex-col space-y-4">
                        {/* <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Upload preview:</Label>

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
                                // onLoadProgress={({ loaded, total }) => null}
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
                                        // dest,
                                        // pageIndex,
                                        pageNumber,
                                      }) =>
                                        setSelectedPages((prev) => {
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
                        </div> */}
                        {/* <div className="flex flex-col">
                          <FileUpload onFileChange={onFileChange} />
                          {selectedPages.length === 1 && (
                            <span>{`${selectedPages.length} page selected`}</span>
                          )}
                          {selectedPages.length >= 2 && (
                            <span>{`${selectedPages.length} pages selected`}</span>
                          )}
                        </div> */}
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px] w-full">
                        {/* <QuestionList
                          questions={insertedQuestions}
                          addManualQuestion={handleFormAddQuestion}
                        /> */}
                        {/* <AddQuestionModal isOpen={isModalOpen}  /> */}
                        <QuestionForm
                          generatedQuestions={insertedQuestions}
                          addManualQuestion={handleFormAddQuestion}
                          deleteQuestion={handleFormDeleteQuestion}
                          updateQuestion={handleFormUpdateQuestion}
                        />

                        {isCompletionLoading && <Loading />}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <Button>Submit</Button> */}

                      {/* <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button> */}
                      {/* {!isCompletionLoading && (
                        <PDFPreview
                          course_name={courseName}
                          questions={insertedQuestions}
                          // questions={trycatch(JSON.parse, completion)}
                          assignment_template_id={assignmentTemplateId}
                          students={students || []}
                        />
                      )} */}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="mt-0 border-0 p-0">
                  <div id="pdf-preview-container">
                    {!isCompletionLoading && (
                      <PDFPreview
                        course_name={courseName}
                        questions={insertedQuestions}
                        // questions={trycatch(JSON.parse, completion)}
                        assignment_template_id={assignmentTemplateId}
                        students={students || []}
                      />
                    )}
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
