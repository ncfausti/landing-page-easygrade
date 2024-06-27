import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T } from '@/components/ui/Typography';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { getCourseStudentsAndAssignments } from '@/utils/supabase-queries';
import { Suspense } from 'react';

async function Course({ courseId }: { courseId: string }) {
  const course = await getCourseStudentsAndAssignments(courseId);
  console.log(course.assignments);
  return (
    <div className="space-y-2">
      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 text-underline flex items-center space-x-2"
        >
          <ArrowLeft /> <span>Back to dashboard</span>
        </Link>
        <T.H1>{course.course_name}</T.H1>
        <T.Subtle>Course: {course.description}</T.Subtle>
      </div>
      <div className="space-y-4">
        <T.H2>Students</T.H2>
        <ul className="space-y-2">
          {course.students.map((student) => (
            <li key={student.id}>
              {student.first_name} {student.last_name}
            </li>
          ))}
        </ul>
        <T.H2>Assignments</T.H2>
        <ul className="space-y-2">
          {course.assignments.map((assignment) => (
            <li key={assignment.assignment_id}>
              {assignment.assignment_name} {assignment.due_date}{' '}
              {assignment.submission_date} {assignment.upload_photo_url}{' '}
              {assignment.pdf_url} {assignment.number_incorrect}{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const { courseId } = params;
  console.log('courseId', courseId);
  try {
    return (
      <Suspense fallback={<T.Subtle>Loading course information...</T.Subtle>}>
        <Course courseId={courseId} />
      </Suspense>
    );
  } catch (error) {
    return notFound();
  }
}
