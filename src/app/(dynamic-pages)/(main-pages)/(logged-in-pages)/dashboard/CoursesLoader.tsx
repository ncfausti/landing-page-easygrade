import { getCurrentTeachersCourses } from '@/utils/supabase-queries';
import Link from 'next/link';

export const revalidate = 30;

export default async function CoursesLoader() {
  const courses = await getCurrentTeachersCourses();

  return (
    <>
      {courses &&
        courses.map((course) => (
          <div key={course.course_id}>
            <Link href={`/course/${course.course_id}`}>
              {course.course_name}
            </Link>
            <div className="text-sm">{course.course_description}</div>
          </div>
        ))}
    </>
  );
}
