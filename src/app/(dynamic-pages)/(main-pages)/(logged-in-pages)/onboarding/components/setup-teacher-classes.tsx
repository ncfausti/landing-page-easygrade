'use client';

import React, { useState, useMemo } from 'react';
import { useFormState } from 'react-dom';
import { setupTeacherClasses } from '@/data/user/courses';

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

// const initialState = { message: null, errors: {} };

export default function TeacherClassesForm() {
  const [state, setState] = useState({ message: null, errors: {} });
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState(['A']);
  const [selectedClass, setSelectedClass] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const addNewClass = () => {
    const newIndex = classes.length;
    setClasses([
      ...classes,
      { grade: '', section: 'A', subject: '', students: '' },
    ]);
    setOpenAccordion(newIndex);
  };

  const handleGradeChange = (index, grade) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], grade, subject: '' };
    setClasses(newClasses);
  };

  const handleSectionChange = (index, section) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], section };
    setClasses(newClasses);
  };

  const addNewSection = () => {
    const lastSection = sections[sections.length - 1];
    const newSection = String.fromCharCode(lastSection.charCodeAt(0) + 1);
    setSections([...sections, newSection]);
  };

  const handleSubjectChange = (index, subject) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], subject };
    setClasses(newClasses);
  };

  const handleStudentsChange = (index, students) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], students };
    setClasses(newClasses);
  };

  const removeClass = (index) => {
    const newClasses = classes.filter((_, i) => i !== index);
    setClasses(newClasses);
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else if (openAccordion > index) {
      setOpenAccordion(openAccordion - 1);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const classTuples = useMemo(() => {
    return classes.map((c) => `${c.grade}-${c.section}-${c.subject}`);
  }, [classes]);

  const selectedStudents = useMemo(() => {
    if (!selectedClass) return [];
    const [grade, section, subject] = selectedClass.split('-');
    const classData = classes.find(
      (c) => c.grade === grade && c.section === section && c.subject === subject
    );
    return classData
      ? classData.students.split('\n').filter((s) => s.trim())
      : [];
  }, [selectedClass, classes]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    const classesData = classes.filter(
      (classItem) =>
        classItem.grade &&
        classItem.section &&
        classItem.subject &&
        classItem.students.trim()
    );

    if (classesData.length === 0) {
      errors.general = 'Please add at least one complete class.';
    }

    if (Object.keys(errors).length > 0) {
      setState({ message: null, errors });
    } else {
      try {
        const result = await setupTeacherClasses(classesData);
        setState({ message: result.message, errors: {} });
      } catch (error) {
        setState({
          message: null,
          errors: { general: 'An unexpected error occurred.' },
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher's Classes Setup</h1>

      <div className="flex justify-between space-x-8">
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Add Classes</h2>
          <form onSubmit={handleSubmit}>
            {classes.map((classItem, index) => (
              <div key={index} className="mb-4 border rounded">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 text-left font-bold bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  Class {index + 1}: {classItem.grade} {classItem.section} -{' '}
                  {classItem.subject}
                </button>
                {openAccordion === index && (
                  <div className="p-4">
                    <div className="mb-4">
                      <label htmlFor={`grade-${index}`} className="block mb-2">
                        Grade:
                      </label>
                      <select
                        id={`grade-${index}`}
                        value={classItem.grade}
                        onChange={(e) =>
                          handleGradeChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded"
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
                      <label
                        htmlFor={`section-${index}`}
                        className="block mb-2"
                      >
                        Section:
                      </label>
                      <select
                        id={`section-${index}`}
                        value={classItem.section}
                        onChange={(e) =>
                          handleSectionChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                      >
                        {sections.map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor={`subject-${index}`}
                        className="block mb-2"
                      >
                        Subject:
                      </label>
                      <select
                        id={`subject-${index}`}
                        value={classItem.subject}
                        onChange={(e) =>
                          handleSubjectChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        disabled={!classItem.grade}
                      >
                        <option value="">Select Subject</option>
                        {classItem.grade &&
                          defaultSubjects[classItem.grade].map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor={`students-${index}`}
                        className="block mb-2"
                      >
                        Students (one per line):
                      </label>
                      <textarea
                        id={`students-${index}`}
                        value={classItem.students}
                        onChange={(e) =>
                          handleStudentsChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        rows="5"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClass(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Remove Class
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="mb-4">
              <button
                type="button"
                onClick={addNewClass}
                className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add New Class
              </button>
              <button
                type="button"
                onClick={addNewSection}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add New Section
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>

          {state.message && (
            <p className="mt-4 text-green-500">{state.message}</p>
          )}
          {state.errors &&
            Object.entries(state.errors).map(([key, value]) => (
              <p key={key} className="mt-2 text-red-500">
                {value}
              </p>
            ))}
        </div>

        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">View Students</h2>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a Class</option>
            {classTuples.map((tuple, index) => (
              <option key={index} value={tuple}>
                {tuple}
              </option>
            ))}
          </select>

          {selectedStudents.length > 0 && (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">No.</th>
                  <th className="border border-gray-300 p-2">Student Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{student}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
