import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T } from '@/components/ui/Typography';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { getCourseStudentsAndAssignments } from '@/utils/supabase-queries';
import { arrayToObjectMap } from '@/lib/utils';
import { Suspense } from 'react';

async function Course({ courseId }: { courseId: string }) {
  const { course_name, description, students, assignments } =
    await getCourseStudentsAndAssignments(courseId);

  const student = arrayToObjectMap(students);

  return (
    <div className="space-y-2">
      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 text-underline flex items-center space-x-2"
        >
          <ArrowLeft /> <span>Back to dashboard</span>
        </Link>
        <T.H1>{course_name}</T.H1>
        <T.Subtle>Course: {description}</T.Subtle>
      </div>
      <div className="space-y-4">
        <T.H2>Students</T.H2>
        <ul className="space-y-2">
          {students.map((student) => (
            <li key={student.id}>
              {student.first_name} {student.last_name}
            </li>
          ))}
        </ul>
        <T.H2>Assignments</T.H2>
        <ul className="space-y-2">
          {assignments.map((assignment) => (
            <li key={assignment.assignment_id}>
              {student[assignment.student_id].first_name}{' '}
              {student[assignment.student_id].last_name}{' '}
              {assignment.assignment_number} {assignment.assignment_name}{' '}
              {assignment.due_date} {assignment.submission_date}{' '}
              {assignment.upload_photo_url} {assignment.pdf_url}{' '}
              {assignment.number_incorrect}{' '}
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
