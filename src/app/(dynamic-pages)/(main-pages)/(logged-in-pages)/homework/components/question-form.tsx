'use client';

import { useState, FormEvent } from 'react';

export default function QuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [answerChoices, setAnswerChoices] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [hints, setHints] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // const response = await fetch('/api/questions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     question_text: questionText,
    //     answer_choices: answerChoices,
    //     correct_answer: correctAnswer,
    //     hints,
    //     question_type: questionType,
    //   }),
    // });

    // if (response.ok) {
    //   setStatus('Question submitted successfully!');
    // } else {
    //   const error = await response.json();
    //   setStatus(`Error: ${error.error}`);
    // }
    console.log(
      JSON.stringify({
        question_text: questionText,
        answer_choices: answerChoices,
        correct_answer: correctAnswer,
        hints,
        question_type: questionType,
      })
    );
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
      {status && <p>{status}</p>}
    </form>
  );
}
