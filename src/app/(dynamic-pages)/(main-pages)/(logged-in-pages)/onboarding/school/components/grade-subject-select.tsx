'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GradeSubjectSelect = () => {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    schoolName: '',
    numberOfTeachers: '',
    homeworkPolicy: '',
  });
  const [currentGrade, setCurrentGrade] = useState('');
  const [currentSubject, setCurrentSubject] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [studentNames, setStudentNames] = useState('');

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setConfiguration((prev) => ({ ...prev, [name]: value }));
  // };

  const handleNextStep = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      setStep((prev) => prev + 1);
    }
  };

  const handleGradeChange = (e) => {
    setCurrentGrade(e.target.value);
    setCurrentSubject('');
  };

  const handleSubjectChange = (e) => {
    setCurrentSubject(e.target.value);
    setStudentNames('');
  };

  const handleAddSubject = () => {
    if (newSubject && currentGrade) {
      setConfiguration((prev) => ({
        ...prev,
        [currentGrade]: {
          ...prev[currentGrade],
          [newSubject]: [],
        },
      }));
      setNewSubject('');
    }
  };

  const handleAddStudents = () => {
    if (currentGrade && currentSubject && studentNames) {
      const students = studentNames.split(',').map((name) => name.trim());
      setConfiguration((prev) => ({
        ...prev,
        [currentGrade]: {
          ...prev[currentGrade],
          [currentSubject]: students,
        },
      }));
      setStudentNames('');
    }
  };

  const slideIn = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { x: '-100%' },
  };

  const grades = [
    'Nursery',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
  ];

  const defaultSubjects = {
    Nursery: ['English', 'EVS', 'Interdisciplinary'],
    '1st': ['English', 'EVS', 'Interdisciplinary'],
    '2nd': ['English', 'EVS', 'Interdisciplinary'],
    '3rd': ['English', 'Math', 'Social', 'Science', 'ICT', 'Interdisciplinary'],
    '4th': ['English', 'Math', 'Social', 'Science', 'ICT', 'Interdisciplinary'],
    '5th': ['English', 'Math', 'Social', 'Science', 'ICT', 'Interdisciplinary'],
    '6th': [
      'English',
      'Math',
      'History & Civics',
      'Geography',
      'Biology',
      'Physics',
      'Chemistry',
      'ICT',
      'Interdisciplinary',
    ],
    '7th': [
      'English',
      'Math',
      'History & Civics',
      'Geography',
      'Biology',
      'Physics',
      'Chemistry',
      'ICT',
      'Interdisciplinary',
    ],
    '8th': [
      'English',
      'Math',
      'History & Civics',
      'Geography',
      'Biology',
      'Physics',
      'Chemistry',
      'ICT',
      'Interdisciplinary',
    ],
    '9th': [
      'English',
      'Math',
      'History & Civics',
      'Geography',
      'Biology',
      'Physics',
      'Chemistry',
      'ICT',
      'Interdisciplinary',
    ],
    '10th': [
      'English',
      'Math',
      'History & Civics',
      'Geography',
      'Biology',
      'Physics',
      'Chemistry',
      'ICT',
      'Interdisciplinary',
    ],
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">School Configuration</h2>
      <form>
        {/* ... (previous steps remain the same) */}

        {step === 4 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideIn}
          >
            <div className="mb-4">
              <label className="block mb-2">Grade</label>
              <select
                value={currentGrade}
                onChange={handleGradeChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {currentGrade && (
              <>
                <div className="mb-4">
                  <label className="block mb-2">Subject</label>
                  <select
                    value={currentSubject}
                    onChange={handleSubjectChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a subject</option>
                    {[
                      ...defaultSubjects[currentGrade],
                      ...Object.keys(configuration[currentGrade] || {}),
                    ].map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Add New Subject</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="flex-grow p-2 border rounded-l"
                      placeholder="New subject name"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {currentSubject && (
                  <div className="mb-4">
                    <label className="block mb-2">
                      Student Names (comma-separated)
                    </label>
                    <textarea
                      value={studentNames}
                      onChange={(e) => setStudentNames(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="4"
                    />
                    <button
                      type="button"
                      onClick={handleAddStudents}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add Students
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </form>

      {/* Navigation buttons */}
      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 4 && (
          <button
            onClick={handleNextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        )}
      </div>

      {/* Display the current configuration object */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Current Configuration:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
          {JSON.stringify(configuration, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default GradeSubjectSelect;
