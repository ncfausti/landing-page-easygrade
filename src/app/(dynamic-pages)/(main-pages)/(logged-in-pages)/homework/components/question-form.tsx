/* eslint-disable prettier/prettier */
'use client';

import { insertQuestionsAction } from '@/data/user/questions';
import { useRef, useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { InsertQuestion, Question } from '@/types';
import { useRouter } from 'next/navigation';
import QuestionItem from './question-item';
// import { AddQuestionDialog } from './add-question-dialog';

export default function QuestionForm(params) {
  const defaultQuestionType = "mc";

  const { generatedQuestions, addManualQuestion, updateQuestion, deleteQuestion } = params;
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [hints, setHints] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState(defaultQuestionType);
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  const { mutate: insertQuestions } = useMutation(
    async (questions: InsertQuestion[]) => {
      return insertQuestionsAction(questions);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating question(s)');
        toastRef.current = toastId;
      },

      onSuccess: (newQuestions: Question[]) => {
        toast.success(
          // eslint-disable-next-line prettier/prettier
          `${newQuestions.length} question${newQuestions.length > 1 ? 's' : ''
          } created `,
          { id: toastRef.current }
        );
        toastRef.current = null;
        router.refresh();
        queryClient.invalidateQueries(['questions']);
        // setStatus('Question submitted successfully!');
        // setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
        // instead of above, send to callback and pass back to parent
        addManualQuestion(newQuestions);

        // Clear the form fields after successful submission
        setQuestionText('');
        setAnswerChoices(['']);
        setCorrectAnswer('');
        setHints(['']);
        setQuestionType(defaultQuestionType);
      },
      onError: () => {
        toast.error('Failed to create question', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    insertQuestions([
      {
        question_text: questionText,
        answer_choices: answerChoices,
        correct_answer: correctAnswer,
        hints,
        question_type: questionType,
      },
    ]);
  };

  // const handleUpdateQuestion = async (updatedQuestion: Question) => {
  //   updateQuestion(updatedQuestion);
  // };

  // const deleteQuestion = (questionId: number) => {
  //   deleteQuestion(questionId);
  // };

  const inputClassNames = `shadow appearance-none border rounded w-2/3
              py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline mb-2`

  const MAX_CHOICES = 7;
  const MAX_CHOICES_ADDED = answerChoices.length >= MAX_CHOICES;
  return (
    <div className="flex p-2 max-h-[800px]">
      <form
        onSubmit={handleSubmit}
        className="max-w-xs mx-2 my-2 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionText"
          >
            Question Text:
          </label>
          <input
            id="questionText"
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Answer Choices:
          </label>
          {answerChoices.map((choice, index) => (
            <>
              <input
                key={index}
                type="text"
                value={choice}
                onChange={(e) => {
                  const newChoices = [...answerChoices];
                  newChoices[index] = e.target.value;
                  setAnswerChoices(newChoices);
                }}
                required
                className={inputClassNames}
              />
              <button className="inline ml-4 rounded-full bg-red-500 text-white text-xl font-semibold w-8 h-8" onClick={
                () => {
                  const newChoices = [...answerChoices];
                  newChoices.splice(index, 1);
                  setAnswerChoices(newChoices);
                }
              }>x</button>
            </>
          ))}
          <br />
          <button
            disabled={MAX_CHOICES_ADDED}
            type="button"
            onClick={() => setAnswerChoices([...answerChoices, ''])}
            className={`bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            ${MAX_CHOICES_ADDED && 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed'}`}
          >
            Add Choice
          </button>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="correctAnswer"
          >
            Correct Answer:
          </label>
          <input
            id="correctAnswer"
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
            className={inputClassNames}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hints:
          </label>
          {hints.map((hint, index) => (
            <input
              key={index}
              type="text"
              value={hint}
              onChange={(e) => {
                const newHints = [...hints];
                newHints[index] = e.target.value;
                setHints(newHints);
              }}
              className={inputClassNames}
            />
          ))}
          <button
            type="button"
            onClick={() => setHints([...hints, ''])}
            className="bg-green-500 hover:bg-green-700 text-white
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Hint
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question Type:
          </label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="questionTypeMC"
                type="radio"
                value="mc"
                checked={questionType === "mc"}
                onChange={(e) => setQuestionType(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
              />
              <label htmlFor="questionTypeMC" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Multiple Choice
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="questionTypeSubjective"
                type="radio"
                value="short_answer"
                checked={questionType === "short_answer"}
                onChange={(e) => setQuestionType(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
              />
              <label htmlFor="questionTypeSubjective" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Subjective
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form >
      {/* {questions.map((question) => (
        <QuestionItem
          key={question.question_id}
          question={question}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
        />
      ))} */}
      {/* <AddQuestionDialog /> */}

      <div
        className={`flex ${generatedQuestions.length !== 0 && 'flex-col'} grow justify-center overflow-y-scroll m-2 p-6 bg-white rounded-lg shadow-md`}
      >
        {generatedQuestions.length === 0 && (
          <p className="flex items-center">No questions added yet</p>
        )}
        {generatedQuestions.map((question) => (
          <QuestionItem
            key={question.question_id}
            question={question}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
          />
        ))}
      </div>
    </div >
  );
}
