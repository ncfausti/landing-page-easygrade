'use client';
import GridCheckbox from '@/components/ui/grid-checkbox';
import { grades, subjects } from '@/constants';
import { insertStudentsAndEnrollmentsAction } from '@/data/user/students';
import { insertTeacherAndSetupCourseAction } from '@/data/user/teachers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Subject } from '@/types';
import SectionForm from './components/section-form';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  const [courseId, setCourseId] = useState<number>(-1);
  const { mutate: insertTeacherAndSetupCourse } = useMutation(
    insertTeacherAndSetupCourseAction,
    {
      onMutate: () => {
        const toastId = toast.loading('Creating teacher and course');
        toastRef.current = toastId;
      },

      onSuccess: (teacherCourses) => {
        toast.success(`New teacher and course added`, {
          id: toastRef.current,
        });
        toastRef.current = null;
        router.refresh();
        queryClient.invalidateQueries([
          'courses',
          'teachers',
          'teacher_courses',
        ]);
        console.log(teacherCourses.course.course_id);
        setCourseId(teacherCourses.course.course_id);
      },
      onError: () => {
        toast.error('Failed to add teacher/course', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );

  const { mutate: insertStudentsAndEnrollments } = useMutation(
    insertStudentsAndEnrollmentsAction,
    {
      onMutate: () => {
        const toastId = toast.loading(
          'Creating students and enrolling in course'
        );
        toastRef.current = toastId;
      },

      onSuccess: (studentsAndEnrollments) => {
        toast.success(`Students added and enrolled `, {
          id: toastRef.current,
        });
        toastRef.current = null;
        router.refresh();
        queryClient.invalidateQueries(['students']);

        console.log(studentsAndEnrollments);
        // input students into course
      },
      onError: () => {
        toast.error('Failed to add students', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    grades: '',
    subjects: '',
    rosterFile: null,
    rosterText: '',
  });

  const handleNext = async () => {
    console.log(formData);
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      setStep(step + 1);

      const { name, grades, subjects } = formData;
      const [teacher_first_name] = name.split(' ').slice(0, 1);
      const teacher_last_name = name.split(' ').slice(1).join(' ');
      const grades_taught = grades.split(',').map((s) => parseInt(s));
      const subjects_taught: Subject[] = subjects.split(',') as Subject[];

      // store teacher in Supabase
      insertTeacherAndSetupCourse({
        teacher: {
          first_name: teacher_first_name,
          last_name: teacher_last_name,
          grades_taught,
          subjects_taught,
        },
      });
    } else {
      // Handle final submission here
      const { rosterText } = formData;

      // Process the roster file (Example: Uploading to Supabase storage)
      // const rosterFileUrl = null;
      const students = rosterText
        .trim()
        .split('\n')
        .filter((s) => s.trim().length > 2 && s.includes(' ')); // includes first and last name
      const studentRows = students.map((student) => {
        const [first_name] = student.split(' ').slice(0, 1);
        const last_name = student.split(' ').slice(1).join(' ');
        return {
          first_name,
          last_name,
          added_by_auth_user_id: '',
        };
      });

      insertStudentsAndEnrollments({
        students: studentRows,
        course_id: courseId,
      });

      router.push('/dashboard');
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, rosterFile: event.target.files[0] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGridChange = (checkedGridValues: string[], name: string) => {
    setFormData({ ...formData, [name]: checkedGridValues.join(',') });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 && (
          <SectionForm />
          // <div className="question">
          //   <h2 className="text-xl font-semibold mb-4">What is your name?</h2>
          //   <input
          //     type="text"
          //     name="name"
          //     value={formData.name}
          //     onChange={handleChange}
          //     className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          //   />
          //   <button
          //     onClick={handleNext}
          //     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          //   >
          //     Next
          //   </button>
          // </div>
        )}
        {step === 2 && (
          <div className="question">
            <h2 className="text-xl font-semibold mb-4">
              What grades do you teach?
            </h2>
            <GridCheckbox
              rows={4}
              columns={3}
              labels={grades}
              onGridChange={(gridValues) =>
                handleGridChange(
                  gridValues.map((s) => s.replace(/\D+/g, '')),
                  'grades'
                )
              }
            />

            {/* <input
              type="text"
              name="grades"
              value={formData.grades}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="question">
            <h2 className="text-xl font-semibold mb-4">
              What subjects do you teach?
            </h2>
            <GridCheckbox
              rows={4}
              columns={3}
              labels={subjects}
              onGridChange={(gridValues) =>
                handleGridChange(gridValues, 'subjects')
              }
            />
            {/* <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="question">
            <h2 className="text-xl font-semibold mb-4">
              Upload a list of students
            </h2>
            <input
              disabled
              type="file"
              accept=".csv,.xls,.xlsx,.txt"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p>Or</p>
            <p className="font-bold">Student List</p>
            <textarea
              name="rosterText"
              placeholder="Type list of students for a single class here (one name per line):"
              className={
                'min-h-[300px] w-full border-2 rounded-lg border-purple-400'
              }
              onChange={handleChange}
            ></textarea>
            <br></br>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
