'use client';

import { insertQuestionsAction } from '@/data/user/questions';
import { useRef, useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { InsertQuestion, Question } from '@/types';
import { useRouter } from 'next/navigation';
import QuestionItem from './question-item';

export default function QuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [hints, setHints] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState('');
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
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
        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
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
    console.log(updatedQuestion);
  };

  const deleteQuestion = async (questionId: string) => {
    // Implement your server action to delete the question
    // This should make an API call to your backend
    console.log(questionId);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
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
      {questions.map((question, index) => (
        // <div key={index}>
        //   <h3>Question {index + 1}</h3>
        //   <p>{question.question_text}</p>
        //   <ul>
        //     {question.answer_choices.map((choice, choiceIndex) => (
        //       <li key={choiceIndex}>{choice}</li>
        //     ))}
        //   </ul>
        //   <p>Correct Answer: {question.correct_answer}</p>
        //   <p>Hints: {question.hints.join(', ')}</p>
        //   <p>Type: {question.question_type}</p>
        // </div>
        <QuestionItem
          key={question.question_id}
          question={question}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
        />
      ))}
    </div>
  );
}
