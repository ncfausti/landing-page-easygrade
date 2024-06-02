'use client';
import React, { useState } from 'react';

const Page = () => {
  const [teacherName, setTeacherName] = useState('');
  const [subjectsTaught, setSubjectsTaught] = useState('');
  const [numberOfClasses, setNumberOfClasses] = useState(1);
  const [studentsInClasses, setStudentsInClasses] = useState(['']);

  const handleClassChange = (index, value) => {
    const newStudentsInClasses = [...studentsInClasses];
    newStudentsInClasses[index] = value;
    setStudentsInClasses(newStudentsInClasses);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data
    const formData = {
      teacherName,
      subjectsTaught,
      numberOfClasses,
      studentsInClasses,
    };
    console.log('Form Data:', formData);
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Teacher's Name:
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Subject(s) Taught:
          <input
            type="text"
            value={subjectsTaught}
            onChange={(e) => setSubjectsTaught(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Number of Classes Taught:
          <input
            type="number"
            value={numberOfClasses}
            onChange={(e) => {
              const newNumberOfClasses = e.target.value;
              setNumberOfClasses(newNumberOfClasses);
              const newStudentsInClasses = [...studentsInClasses];
              if (newNumberOfClasses > studentsInClasses.length) {
                for (
                  let i = studentsInClasses.length;
                  i < newNumberOfClasses;
                  i++
                ) {
                  newStudentsInClasses.push('');
                }
              } else {
                newStudentsInClasses.length = newNumberOfClasses;
              }
              setStudentsInClasses(newStudentsInClasses);
            }}
            min="1"
            required
          />
        </label>
      </div>
      {studentsInClasses.map((students, index) => (
        <div key={index}>
          <label>
            Number of Students in Class {index + 1}:
            <input
              type="number"
              value={students}
              onChange={(e) => handleClassChange(index, e.target.value)}
              min="1"
              required
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;
