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

  const headerText = assignmentId
    ? `Assignment: ${assignmentId}`
    : 'Assignments';
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
        <T.H2 className="hidden">Students</T.H2>
        <ul className="space-y-2 hidden">
          {students.map((student) => (
            <li key={student.id}>
              {student.first_name} {student.last_name}
            </li>
          ))}
        </ul>
        <T.H2>{headerText}</T.H2>
        {/* <ul className="space-y-2">
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
        </ul> */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # Incorrect
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question IDs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.assignment_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student[assignment.student_id].first_name}{' '}
                      {student[assignment.student_id].last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {assignment.assignment_number}
                    </div>
                    <div className="text-sm text-gray-500">
                      {assignment.assignment_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Due: {assignment.due_date}
                    </div>
                    <div className="text-sm text-gray-500">
                      Submitted: {assignment.submission_date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.upload_photo_url && (
                      <a
                        target="_blank"
                        href={`https://eqdytqcvbpsqadodnoyl.supabase.co/storage/v1/object/public/homework/${assignment.upload_photo_url}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Photo
                      </a>
                    )}

                    <a
                      href={assignment.pdf_url}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      PDF
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.number_incorrect}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.question_ids.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  filterFunction: (
    assignment: Assignment,
    value: string | null | undefined
  ) => boolean
) => {
  if (externalValue !== null && externalValue !== undefined) {
    return assignments.filter((assignment) =>
      filterFunction(assignment, externalValue)
    );
  }
  return assignments;
};
