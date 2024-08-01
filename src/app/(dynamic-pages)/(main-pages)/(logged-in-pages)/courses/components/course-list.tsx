'use client';
import { Course, InsertCourse } from '@/types';
import { addCourse } from '@/data/user/courses';
import { useOptimistic } from 'react';

type CourseListProps = {
  courses: Course[];
};
export default function CourseList({ courses }: CourseListProps) {
  const [optimisticCourses, addOptimisticCourse] = useOptimistic(
    courses,
    (state, newCourse: InsertCourse) => {
      return [...state, newCourse];
    }
  );

  return (
    <>
      <form
        action={async (formData) => {
          const name = formData.get('course_name');
          const description = formData.get('description');
          addOptimisticCourse({
            course_name: name.toString(),
            description: description.toString(),
            grade: '9',
            section: 'B',
            subject: name.toString(),
          });
          await addCourse(formData);
        }}
      >
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          required
        />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          required
        />
        <br />
        <button className="bg-blue-500 rounded px-4 py-2 text-white font-semibold">
          Add Course
        </button>
      </form>
      <div>
        {optimisticCourses.map((course) => (
          <div key={course.course_id}>
            <strong>
              {course.course_name} : {course.course_id}
            </strong>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
