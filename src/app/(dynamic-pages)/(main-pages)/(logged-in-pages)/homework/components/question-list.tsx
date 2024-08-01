// import React, { useState } from 'react';
// // import { useQuery } from '@tanstack/react-query';
// import QuestionItem from './question-item';
// import AddQuestionModal from './add-question-modal';
// import { InsertQuestion, Question } from '@/types';

// export default function QuestionList(params) {
//   const { questions, addManualQuestion } = params;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const {
//   //   data: questions,
//   //   isLoading,
//   //   error,
//   // } = useQuery(['questions'], fetchQuestions);

//   const updateQuestion = async (updatedQuestion: Question) => {
//     // Implement your server action to update the question
//   };

//   const deleteQuestion = async (questionId: number) => {
//     // Implement your server action to delete the question
//   };

//   // const addQuestion = async (newQuestion: InsertQuestion) => {
//   //   // Implement your server action to add a new question
//   // };

//   // if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>An error occurred: {error.message}</div>;

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Questions</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Add Question
//         </button>
//       </div>
//       {questions.map((question) => (
//         <QuestionItem
//           key={question.question_id}
//           question={question}
//           onUpdate={updateQuestion}
//           onDelete={deleteQuestion}
//         />
//       ))}
//       <AddQuestionModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddQuestion={addManualQuestion}
//       />
//     </div>
//   );
// }
