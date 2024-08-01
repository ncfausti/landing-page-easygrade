import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Question } from '@/types';
import {
  updateQuestionAction,
  deleteQuestionAction,
} from '@/data/user/questions';
import { startTransition } from 'react';

interface QuestionItemProps {
  question: Question;
  onUpdate: (updatedQuestion: Question) => void;
  onDelete: (questionId: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<Question>(question);

  const queryClient = useQueryClient();

  // const updateMutation = useMutation(onUpdate, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['questions']);
  //     toast.success('Question updated successfully');
  //     setIsEditing(false);
  //   },
  //   onError: () => {
  //     toast.error('Failed to update question');
  //   },
  // });

  // const deleteMutation = useMutation(onDelete, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['questions']);
  //     toast.success('Question deleted successfully');
  //   },
  //   onError: () => {
  //     toast.error('Failed to delete question');
  //   },
  // });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Question
  ) => {
    setEditedQuestion({ ...editedQuestion, [field]: e.target.value });
  };

  const handleAnswerChoiceChange = (index: number, value: string) => {
    const newAnswerChoices = [...editedQuestion.answer_choices];
    newAnswerChoices[index] = value;
    setEditedQuestion({ ...editedQuestion, answer_choices: newAnswerChoices });
  };

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...editedQuestion.hints];
    newHints[index] = value;
    setEditedQuestion({ ...editedQuestion, hints: newHints });
  };

  const handleSave = () => {
    console.log(editedQuestion);
    startTransition(async () => {
      const result = await updateQuestionAction(editedQuestion);
      if (result.success) {
        // Handle successful deletion (e.g., update UI, show notification)
        // callback to remove the question from the list

        // need to update the question in the parent component
        onUpdate(editedQuestion);
        console.log('Question updated successfully');
      } else {
        // Handle error
        console.error('Failed to update question.');
      }
    });

    setIsEditing(false);
    // updateMutation.mutate(editedQuestion);
  };

  // const handleDelete = () => {
  //   if (
  //     window.confirm(
  //       'Are you sure you want to delete this question? ' + question.question_id
  //     )
  //   ) {
  //     onDelete(question.question_id);
  //   }
  // };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteQuestionAction(question.question_id);
      if (result.success) {
        // Handle successful deletion (e.g., update UI, show notification)
        // callback to remove the question from the list
        onDelete(question.question_id);
        console.log('Question deleted successfully');
      } else {
        // Handle error
        console.error('Failed to delete question:', result.error);
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="questionText"
            >
              Question Text:
            </label>
            <textarea
              id="questionText"
              value={editedQuestion.question_text}
              onChange={(e) => handleInputChange(e, 'question_text')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Answer Choices:
            </label>
            {editedQuestion.answer_choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                value={choice}
                onChange={(e) =>
                  handleAnswerChoiceChange(index, e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
            ))}
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
              value={editedQuestion.correct_answer}
              onChange={(e) => handleInputChange(e, 'correct_answer')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hints:
            </label>
            {editedQuestion.hints.map((hint, index) => (
              <input
                key={index}
                type="text"
                value={hint}
                onChange={(e) => handleHintChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
            ))}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="questionType"
            >
              Question Type:
            </label>
            <input
              id="questionType"
              type="text"
              value={editedQuestion.question_type}
              onChange={(e) => handleInputChange(e, 'question_type')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-2">{question.question_text}</h3>
          <p className="mb-2">
            <strong>Answer Choices:</strong>{' '}
            {question.answer_choices.join(', ')}
          </p>
          <p className="mb-2">
            <strong>Correct Answer:</strong> {question.correct_answer}
          </p>
          <p className="mb-2">
            <strong>Hints:</strong> {question.hints.join(', ')}
          </p>
          <p className="mb-4">
            <strong>Question Type:</strong> {question.question_type}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
