/* eslint-disable prettier/prettier */
'use client';

import { insertQuestionsAction } from '@/data/user/questions';
import { useRef, useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { InsertQuestion, Question } from '@/types';
import { useRouter } from 'next/navigation';
import QuestionItem from './question-item';
import { deleteQuestionAction } from '@/data/user/questions';
// import { AddQuestionDialog } from './add-question-dialog';

export default function QuestionForm(params) {
  const { generatedQuestions, addManualQuestion } = params;
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [hints, setHints] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState('');
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(generatedQuestions);
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);

  console.log('qs in form:', generatedQuestions);
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
        setQuestionType('');
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

  const updateQuestion = async (updatedQuestion: Question) => {
    // Implement your server action to update the question
    // This should make an API call to your backend
    console.log('updated question:', updatedQuestion);
    console.log(updatedQuestion);
  };

  const deleteQuestion = async (questionId: number) => {
    // Implement your server action to delete the question
    // This should make an API call to your backend
    console.log('deleting :', questionId);
    await deleteQuestionAction(questionId);
    const result = await deleteQuestionAction(questionId)
      if (result.success) {
        router.refresh() // This will trigger a re-render of the page
      } else {
        alert('Failed to delete question')
      }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-2 my-2 p-6 bg-white rounded-lg shadow-md"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => setAnswerChoices([...answerChoices, ''])}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => setHints([...hints, ''])}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Hint
          </button>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionType"
          >
            Question Type:
          </label>
          <input
            id="questionType"
            type="text"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
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
        className={`flex ${generatedQuestions.length !== 0 && 'flex-col'} grow justify-center max-h-[600px] overflow-y-scroll m-2 p-6 bg-white rounded-lg shadow-md`}
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
    </div>
  );
}
