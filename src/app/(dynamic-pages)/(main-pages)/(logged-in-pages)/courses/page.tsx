import { getAllCourses } from '@/utils/supabase-queries';
import CourseList from './components/course-list';

export default async function Page() {
  const courses = await getAllCourses();
  return (
    <div>
      <CourseList courses={courses} />
    </div>
  );
}
