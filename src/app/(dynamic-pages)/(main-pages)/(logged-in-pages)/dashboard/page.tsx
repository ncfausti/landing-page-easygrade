import { getCurrentTeachersCourses } from '@/utils/supabase-queries';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const courses = await getCurrentTeachersCourses();
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2 className="text-xl font-bold">Courses</h2>
      {courses &&
        courses.map((course) => (
          <div key={course.course_id}>
            <Link href={`/course/${course.course_id}`}>
              {' '}
              {course.course_name}
            </Link>
            <div className="text-sm">{course.course_description} </div>
          </div>
        ))}

      {/* <ClientPage /> */}
    </div>
  );
}
