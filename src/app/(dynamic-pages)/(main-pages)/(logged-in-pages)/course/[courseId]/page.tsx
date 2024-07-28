import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T } from '@/components/ui/Typography';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import { getCourseStudentsAndAssignments } from '@/utils/supabase-queries';
import { arrayToObjectMap } from '@/lib/utils';
import { Suspense } from 'react';
import { Assignment } from '@/types';

async function Course({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) {
  const { course_name, description, students, assignments } =
    await getCourseStudentsAndAssignments(courseId);

  const student = arrayToObjectMap(students);
  console.log(assignments);

  // if assignmentId is not null or undefined, filter assignments on it
  const filteredAssignments = filterAssignments(
    assignments,
    assignmentId,
    (assignment, value) => assignment.assignment_template_id === value
  );
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
          {filteredAssignments &&
            filteredAssignments.map((assignment) => (
              <li key={assignment.assignment_id}>
                {student[assignment.student_id].first_name}{' '}
                {student[assignment.student_id].last_name}{' '}
                {assignment.assignment_number} {assignment.assignment_name}{' '}
                {assignment.due_date} {assignment.submission_date}{' '}
                {assignment.upload_photo_url} {assignment.pdf_url}{' '}
                {assignment.number_incorrect}
                {'Question IDs: '}
                {assignment.question_ids.map((question) => (
                  <span key={question}>{question} </span>
                ))}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

type SearchParams = {
  [key: string]: string | undefined;
};
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: SearchParams;
}) {
  const { courseId } = params;
  const { aid } = searchParams;
  console.log('courseId', courseId);
  console.log('aid', aid);
  try {
    return (
      <Suspense fallback={<T.Subtle>Loading course information...</T.Subtle>}>
        <Course courseId={courseId} assignmentId={aid} />
      </Suspense>
    );
  } catch (error) {
    return notFound();
  }
}

const filterAssignments = (
  assignments: Assignment[],
  externalValue: string,
  filterFunction: (assignment: Assignment, value: any) => boolean
) => {
  if (externalValue !== null && externalValue !== undefined) {
    return assignments.filter((assignment) =>
      filterFunction(assignment, externalValue)
    );
  }
  return assignments;
};
