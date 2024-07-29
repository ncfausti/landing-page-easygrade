import CameraInput from '@/components/ui/CameraInput';
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import ImageUploader from '@/app/grade/components/image-uploader';
import { createSupabaseServerComponentClient } from '@/supabase-clients/createSupabaseServerComponentClient';
const SUPABASE_HW_IMG_UPLOAD_BUCKET = process.env.SUPABASE_HW_IMG_UPLOAD_BUCKET;

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
    const { subject } = assignmentData;
    const submitted_image_src = `${SUPABASE_HW_IMG_UPLOAD_BUCKET}/${assignmentData.upload_photo_url}`;
    return (
      <div>
        <h1>Assignment Details</h1>
        <p>Assignment: {assignment_template_id}</p>
        <p>Student ID: {student_id}</p>
        <p>Current Number Incorrect: {assignmentData.number_incorrect}</p>
        <img src={submitted_image_src} height={300} width={150} />
        {/* <UpdateGradeForm
          assignment_template_id={assignment_template_id}
          student_id={student_id}
          initialNumberCorrect={assignmentData.number_correct}
        /> */}
        <CameraInput
          assignment_template_id={assignment_template_id}
          student_id={student_id}
          subject={subject}
        />
        {/* <ImageUploader
          bucketName="homework"
          assignment_template_id={assignment_template_id}
          student_id={student_id}
        /> */}
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
