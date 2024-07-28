import ImageUploader from '../../components/image-uploader';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { createSupabaseServerComponentClient } from '@/supabase-clients/createSupabaseServerComponentClient';

const fetchGradeData = async (assignmentTemplateId, studentId) => {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('assignment_template_id', assignmentTemplateId)
    .eq('student_id', studentId)
    .single();

  if (error) throw error;
  return data;
};

export default async function Grade({ params }) {
  const { assignment_template_id, student_id } = params;
  try {
    const assignmentData = await fetchGradeData(
      assignment_template_id,
      student_id
    );

    if (!assignmentData) {
      return <div>No assignment data found.</div>;
    }

    return (
      <div>
        <h1>Assignment Details</h1>
        <p>Assignment Template ID: {assignment_template_id}</p>
        <p>Student ID: {student_id}</p>
        <p>Current Number Incorrect: {assignmentData.number_incorrect}</p>
        {/* <UpdateGradeForm
          assignment_template_id={assignment_template_id}
          student_id={student_id}
          initialNumberCorrect={assignmentData.number_correct}
        /> */}
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
