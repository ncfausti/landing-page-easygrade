// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';
// import { InsertQuestion } from '@/types';

// interface AddQuestionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddQuestion: (question: InsertQuestion) => Promise<void>;
// }

// const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
//   isOpen,
//   onClose,
//   onAddQuestion,
// }) => {
//   const [questionText, setQuestionText] = useState('');
//   const [answerChoices, setAnswerChoices] = useState<string[]>(['']);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [hints, setHints] = useState<string[]>(['']);
//   const [questionType, setQuestionType] = useState('');

//   const queryClient = useQueryClient();

//   const addQuestionMutation = useMutation(onAddQuestion, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['questions']);
//       toast.success('Question added successfully');
//       onClose();
//       resetForm();
//     },
//     onError: () => {
//       toast.error('Failed to add question');
//     },
//   });

//   const resetForm = () => {
//     setQuestionText('');
//     setAnswerChoices(['']);
//     setCorrectAnswer('');
//     setHints(['']);
//     setQuestionType('');
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addQuestionMutation.mutate({
//       question_text: questionText,
//       answer_choices: answerChoices,
//       correct_answer: correctAnswer,
//       hints,
//       question_type: questionType,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//         <h3 className="text-lg font-bold mb-4">Add New Question</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="questionText"
//             >
//               Question Text:
//             </label>
//             <input
//               id="questionText"
//               type="text"
//               value={questionText}
//               onChange={(e) => setQuestionText(e.target.value)}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Answer Choices:
//             </label>
//             {answerChoices.map((choice, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={choice}
//                 onChange={(e) => {
//                   const newChoices = [...answerChoices];
//                   newChoices[index] = e.target.value;
//                   setAnswerChoices(newChoices);
//                 }}
//                 required
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
//               />
//             ))}
//             <button
//               type="button"
//               onClick={() => setAnswerChoices([...answerChoices, ''])}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Choice
//             </button>
//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="correctAnswer"
//             >
//               Correct Answer:
//             </label>
//             <input
//               id="correctAnswer"
//               type="text"
//               value={correctAnswer}
//               onChange={(e) => setCorrectAnswer(e.target.value)}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Hints:
//             </label>
//             {hints.map((hint, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={hint}
//                 onChange={(e) => {
//                   const newHints = [...hints];
//                   newHints[index] = e.target.value;
//                   setHints(newHints);
//                 }}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
//               />
//             ))}
//             <button
//               type="button"
//               onClick={() => setHints([...hints, ''])}
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Hint
//             </button>
//           </div>

//           <div className="mb-6">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="questionType"
//             >
//               Question Type:
//             </label>
//             <input
//               id="questionType"
//               type="text"
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Question
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddQuestionModal;
