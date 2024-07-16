'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { createGradeSections } from '@/data/user/courses'; // We'll define this in a separate file

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

const grades = Object.keys(defaultSubjects);

const initialState = { message: null, errors: {} };

export default function GradeForm() {
  const [state, formAction] = useFormState(createGradeSections, initialState);
  const [gradeData, setGradeData] = useState([
    { grade: '', sections: [{ id: 1, subjects: [] }] },
  ]);

  const handleGradeChange = (index, grade) => {
    const newGradeData = [...gradeData];
    newGradeData[index] = { grade, sections: [{ id: 1, subjects: [] }] };
    setGradeData(newGradeData);
  };

  const addSection = (gradeIndex) => {
    const newGradeData = [...gradeData];
    const newSectionId = newGradeData[gradeIndex].sections.length + 1;
    newGradeData[gradeIndex].sections.push({ id: newSectionId, subjects: [] });
    setGradeData(newGradeData);
  };

  const removeSection = (gradeIndex, sectionIndex) => {
    const newGradeData = [...gradeData];
    newGradeData[gradeIndex].sections = newGradeData[
      gradeIndex
    ].sections.filter((_, i) => i !== sectionIndex);
    setGradeData(newGradeData);
  };

  const handleSubjectChange = (
    gradeIndex,
    sectionIndex,
    subject,
    isChecked
  ) => {
    const newGradeData = [...gradeData];
    if (isChecked) {
      newGradeData[gradeIndex].sections[sectionIndex].subjects.push(subject);
    } else {
      newGradeData[gradeIndex].sections[sectionIndex].subjects = newGradeData[
        gradeIndex
      ].sections[sectionIndex].subjects.filter((s) => s !== subject);
    }
    setGradeData(newGradeData);
  };

  const addGrade = () => {
    setGradeData([
      ...gradeData,
      { grade: '', sections: [{ id: 1, subjects: [] }] },
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
          {gradeItem.sections.map((section, sectionIndex) => (
            <div key={section.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold mb-2">
                Section {section.id}
              </h3>
              <div className="mb-2">
                <p className="font-medium mb-2">Subjects:</p>
                {gradeItem.grade &&
                  defaultSubjects[gradeItem.grade].map((subject) => (
                    <div key={subject} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        id={`subject-${gradeIndex}-${sectionIndex}-${subject}`}
                        name={`subject-${gradeIndex}-${sectionIndex}-${subject}`}
                        value={subject}
                        checked={section.subjects.includes(subject)}
                        onChange={(e) =>
                          handleSubjectChange(
                            gradeIndex,
                            sectionIndex,
                            subject,
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`subject-${gradeIndex}-${sectionIndex}-${subject}`}
                      >
                        {subject}
                      </label>
                    </div>
                  ))}
              </div>
              {sectionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => removeSection(gradeIndex, sectionIndex)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addSection(gradeIndex)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Section
          </button>
          {gradeIndex > 0 && (
            <button
              type="button"
              onClick={() => removeGrade(gradeIndex)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
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
