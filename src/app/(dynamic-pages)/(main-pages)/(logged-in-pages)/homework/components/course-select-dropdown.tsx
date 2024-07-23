import React, { useEffect, useState } from 'react';
import { View, CourseStudents } from '@/types';
import { supabaseUserClientComponentClient } from '@/supabase-clients/supabaseUserClientComponentClient';
import {
  getCurrentTeachersCoursesFromFrontend,
  getCourseEnrollmentsFromFrontend,
} from '@/utils/supabase-queries';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CourseSelectDropdown(props) {
  const { handleCourseSelect, setEnrollmentsCallback } = props;
  const [courses, setCourses] = useState<View<'teacher_courses_by_auth'>[]>([]);
  // const [enrollments, setEnrollments] = useState<CourseStudents[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await getCurrentTeachersCoursesFromFrontend(
        supabaseUserClientComponentClient
      );
      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
        const course_ids = data.map((course) => course.course_id);
        const { data: enrollmentsData, error: enrollmentsError } =
          await getCourseEnrollmentsFromFrontend(
            supabaseUserClientComponentClient,
            course_ids
          );
        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError);
        } else {
          // send the enrollments data back to the parent component
          setEnrollmentsCallback(reduceEnrollments(enrollmentsData));
        }
      }
    };

    fetchCourses();
  }, []);

  // console.log('enrollments', enrollments);

  return courses ? (
    <Select
      onValueChange={(courseId: string) =>
        handleCourseSelect(
          courseId,
          courses
            .filter((course) => course.course_id === parseInt(courseId))
            .at(0).course_name
        )
      }
    >
      <SelectTrigger className="mx-2">
        <SelectValue placeholder={'Select course period'} />
      </SelectTrigger>
      <SelectContent>
        {courses.map((course) => (
          <SelectItem key={course.course_id} value={`${course.course_id}`}>
            {course.course_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <Select>
      <SelectValue placeholder={'Loading courses'} />
    </Select>
  );
}

function reduceEnrollments(enrollments): CourseStudents[] {
  // Use reduce to group student_ids by course_id
  return Object.values(
    enrollments.reduce((acc, { student_id, course_id }) => {
      if (!acc[course_id]) {
        acc[course_id] = { course_id, student_ids: [] };
      }
      acc[course_id].student_ids.push(student_id);
      return acc;
    }, {})
  );
}
