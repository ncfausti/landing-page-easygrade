'use client';

import { insertQuestionsAction } from '@/data/user/questions';
import { useRef, useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { InsertQuestion, Question } from '@/types';
import { useRouter } from 'next/navigation';

export default function QuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [hints, setHints] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState('');
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Text:
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
      </label>
      <label>
        Answer Choices:
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
          />
        ))}
        <button
          type="button"
          onClick={() => setAnswerChoices([...answerChoices, ''])}
        >
          Add Choice
        </button>
      </label>
      <label>
        Correct Answer:
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
      </label>
      <label>
        Hints:
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
          />
        ))}
        <button type="button" onClick={() => setHints([...hints, ''])}>
          Add Hint
        </button>
      </label>
      <label>
        Question Type:
        <input
          type="text"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
