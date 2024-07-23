'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseUserClientComponentClient } from '@/supabase-clients/supabaseUserClientComponentClient';

const supabase = supabaseUserClientComponentClient;
// Function to fetch enrollments for a course
// Function to fetch enrollments for a course
const fetchEnrollments = async (courseId) => {
  if (!courseId) return [];
  const { data, error } = await supabase
    .from('enrollments')
    .select('student_id')
    .eq('course_id', courseId)
    .select();

  if (error) throw error;
  return data.map((enrollment) => enrollment.student_id);
};

// Function to fetch students by IDs
const fetchStudents = async (studentIds) => {
  if (!studentIds) return [];
  console.log(studentIds);
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .in('id', studentIds);

  if (error) throw error;
  console.log('fetchStudents: ', data);
  return data;
};

// Course Selector Component
function CourseSelector({ onSelectCourse }) {
  const handleChange = (e) => {
    onSelectCourse(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a course</option>
      <option value="44">Course 1</option>
      <option value="45">Course 2</option>
      {/* Add more course options as needed */}
    </select>
  );
}

// Main Component
function CourseStudents() {
  const [courseId, setCourseId] = useState(44);
  const queryClient = useQueryClient();

  // Query for enrollments
  const enrollmentsQuery = useQuery(
    ['enrollments', courseId],
    () => fetchEnrollments(courseId),
    {
      enabled: !!courseId,
      staleTime: Infinity, // Prevent automatic refetching
    }
  );

  // Query for students
  const studentsQuery = useQuery(
    ['students', enrollmentsQuery.data],
    () => fetchStudents(enrollmentsQuery.data),
    {
      enabled: !!enrollmentsQuery.data && enrollmentsQuery.data.length > 0,
      staleTime: Infinity, // Prevent automatic refetching
    }
  );

  const handleCourseSelect = (newCourseId) => {
    setCourseId(parseInt(newCourseId));
  };

  // Function to force refresh data
  const refreshData = () => {
    queryClient.invalidateQueries(['enrollments', courseId]);
    queryClient.invalidateQueries(['students', enrollmentsQuery.data]);
  };

  if (!courseId) {
    return (
      <div>
        <CourseSelector onSelectCourse={handleCourseSelect} />
        <p>Please select a course.</p>
      </div>
    );
  }

  if (enrollmentsQuery.isLoading) return <div>Loading enrollments...</div>;
  if (enrollmentsQuery.error)
    return (
      <div>Error loading enrollments: {enrollmentsQuery.error.message}</div>
    );

  if (studentsQuery.isLoading) return <div>Loading students...</div>;
  if (studentsQuery.error)
    return <div>Error loading students: {studentsQuery.error.message}</div>;

  return (
    <div>
      <CourseSelector onSelectCourse={handleCourseSelect} />
      <h2>Students in Course {courseId}</h2>
      {studentsQuery.data && studentsQuery.data.length > 0 ? (
        <ul>
          {studentsQuery.data.map((student) => (
            <li key={student.id}>{student.first_name}</li>
          ))}
        </ul>
      ) : (
        <p>No students found in this course.</p>
      )}
      <button onClick={refreshData}>Refresh Data</button>
    </div>
  );
}

export default CourseStudents;
