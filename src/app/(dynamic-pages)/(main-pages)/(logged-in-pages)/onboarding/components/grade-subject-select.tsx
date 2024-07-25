'use client';
import React, { useState } from 'react';

interface SchoolInfo {
  schoolName: string;
  numberOfTeachers: string;
  homeworkPolicy: string;
}
const GradeSubjectSelect = () => {
  const [configuration, setConfiguration] = useState<SchoolInfo>({
    schoolName: '',
    numberOfTeachers: '',
    homeworkPolicy: '',
  });
  const [currentGrade, setCurrentGrade] = useState('');
  const [currentSubject, setCurrentSubject] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [studentNames, setStudentNames] = useState('');

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
      const students = studentNames
        .split('\n')
        .map((name) => name.trim())
        .filter(Boolean);
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

  const allSubjects = Array.from(
    new Set(Object.values(defaultSubjects).flat())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">
        Grade and Subject Configuration
      </h2>
      <form>
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
                  Student names for{' '}
                  <span className="font-bold">
                    {currentGrade} grade {currentSubject}
                  </span>{' '}
                  (one per line):
                </label>
                <textarea
                  value={studentNames}
                  onChange={(e) => setStudentNames(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
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
      </form>

      {/* Table View */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Subject</th>
              {grades.map((grade) => (
                <th key={grade} className="py-2 px-4 border-b">
                  {grade}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSubjects.map((subject) => (
              <tr key={subject}>
                <td className="py-2 px-4 border-b font-medium">{subject}</td>
                {grades.map((grade) => (
                  <td
                    key={`${grade}-${subject}`}
                    className="py-2 px-4 border-b text-center"
                  >
                    {getSubjectCount(
                      grade,
                      subject,
                      configuration,
                      defaultSubjects
                    )}
                    {/* {configuration[grade] && configuration[grade][subject]
                      ? configuration[grade][subject].length
                      : defaultSubjects[grade].includes(subject)
                        ? '0'
                        : '-'} */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

function getSubjectCount(
  grade: string,
  subject: string,
  configuration: SchoolInfo,
  defaultSubjects: object
) {
  const gradeConfig = configuration[grade];
  const subjectConfig = gradeConfig?.[subject];

  if (subjectConfig) {
    return subjectConfig.length;
  }

  if (defaultSubjects[grade]?.includes(subject)) {
    return '0';
  }

  return '-';
}

export default GradeSubjectSelect;
