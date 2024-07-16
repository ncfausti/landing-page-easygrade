'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { setupSchoolStructure } from '@/data/user/schools'; // We'll define this in a separate file

const defaultSubjects = {
  Nursery: ['English', 'Maths', 'EVS'],
  LKG: ['English', 'Maths', 'EVS'],
  UKG: ['English', 'Maths', 'EVS'],
  'Class 1': ['English', 'Hindi', 'Maths', 'EVS', 'Computer Studies'],
  'Class 2': ['English', 'Hindi', 'Maths', 'EVS', 'Computer Studies'],
  'Class 3': ['English', 'Hindi', 'Maths', 'EVS', 'Computer Studies'],
  'Class 4': ['English', 'Hindi', 'Maths', 'EVS', 'Computer Studies'],
  'Class 5': ['English', 'Hindi', 'Maths', 'EVS', 'Computer Studies'],
  'Class 6': [
    'English',
    'Hindi',
    'Maths',
    'History & Civics',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Studies',
  ],
  'Class 7': [
    'English',
    'Hindi',
    'Maths',
    'History & Civics',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Studies',
  ],
  'Class 8': [
    'English',
    'Hindi',
    'Maths',
    'History & Civics',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Studies',
  ],
  'Class 9': [
    'English',
    'Hindi',
    'Maths',
    'History & Civics',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Applications',
  ],
  'Class 10': [
    'English',
    'Hindi',
    'Maths',
    'History & Civics',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Applications',
  ],
  'Class 11': [
    'English',
    'Physics',
    'Chemistry',
    'Biology',
    'Maths',
    'Computer Science',
    'Economics',
  ],
  'Class 12': [
    'English',
    'Physics',
    'Chemistry',
    'Biology',
    'Maths',
    'Computer Science',
    'Economics',
  ],
};

const grades = Object.keys(defaultSubjects);

const initialState = { message: null, errors: {} };

export default function SchoolStructureForm() {
  const [state, formAction] = useFormState(setupSchoolStructure, initialState);
  const [gradeData, setGradeData] = useState([
    { grade: '', sections: [{ name: 'A' }], subjects: [] },
  ]);

  const handleGradeChange = (index, grade) => {
    const newGradeData = [...gradeData];
    newGradeData[index] = {
      ...newGradeData[index],
      grade,
      subjects: defaultSubjects[grade].map((subject) => ({
        name: subject,
        isCompulsory: true,
      })),
    };
    setGradeData(newGradeData);
  };

  const addSection = (gradeIndex) => {
    const newGradeData = [...gradeData];
    const sectionName = String.fromCharCode(
      65 + newGradeData[gradeIndex].sections.length
    ); // A, B, C, ...
    newGradeData[gradeIndex].sections.push({ name: sectionName });
    setGradeData(newGradeData);
  };

  const removeSection = (gradeIndex, sectionIndex) => {
    const newGradeData = [...gradeData];
    newGradeData[gradeIndex].sections = newGradeData[
      gradeIndex
    ].sections.filter((_, i) => i !== sectionIndex);
    setGradeData(newGradeData);
  };

  const handleSubjectChange = (gradeIndex, subjectIndex, isCompulsory) => {
    const newGradeData = [...gradeData];
    newGradeData[gradeIndex].subjects[subjectIndex].isCompulsory = isCompulsory;
    setGradeData(newGradeData);
  };

  const addGrade = () => {
    setGradeData([
      ...gradeData,
      { grade: '', sections: [{ name: 'A' }], subjects: [] },
    ]);
  };

  const removeGrade = (index) => {
    const newGradeData = gradeData.filter((_, i) => i !== index);
    setGradeData(newGradeData);
  };

  return (
    <form action={formAction}>
      {gradeData.map((gradeItem, gradeIndex) => (
        <div key={gradeIndex} className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">Grade</h2>
          <div className="mb-4">
            <label htmlFor={`grade-${gradeIndex}`} className="block mb-2">
              Grade:
            </label>
            <select
              id={`grade-${gradeIndex}`}
              name={`grade-${gradeIndex}`}
              value={gradeItem.grade}
              onChange={(e) => handleGradeChange(gradeIndex, e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Sections</h3>
            {gradeItem.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-2 flex items-center">
                <input
                  type="text"
                  name={`section-${gradeIndex}-${sectionIndex}`}
                  value={section.name}
                  readOnly
                  className="p-2 border rounded mr-2"
                />
                {sectionIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSection(gradeIndex, sectionIndex)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSection(gradeIndex)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Section
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Subjects</h3>
            {gradeItem.subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={subject.name}
                  readOnly
                  className="p-2 border rounded mr-2"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={subject.isCompulsory}
                    onChange={(e) =>
                      handleSubjectChange(
                        gradeIndex,
                        subjectIndex,
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  Compulsory
                </label>
              </div>
            ))}
          </div>
          {gradeIndex > 0 && (
            <button
              type="button"
              onClick={() => removeGrade(gradeIndex)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove Grade
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addGrade}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Grade
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
      {state.message && <p className="mt-4 text-green-500">{state.message}</p>}
      {state.errors &&
        Object.entries(state.errors).map(([key, value]) => (
          <p key={key} className="mt-2 text-red-500">
            {value}
          </p>
        ))}
    </form>
  );
}
