import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('your-supabase-url', 'your-supabase-key');

const OnboardTeacher = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    grades: '',
    subjects: '',
    rosterFile: null,
  });

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Handle final submission here
      const { name, grades, subjects, rosterFile } = formData;

      // Process the roster file (Example: Uploading to Supabase storage)
      let rosterFileUrl = null;
      if (rosterFile) {
        const { data, error } = await supabase.storage
          .from('rosters')
          .upload(`roster-${Date.now()}`, rosterFile);
        if (error) {
          console.error('Error uploading roster:', error);
        } else {
          rosterFileUrl = data.path;
        }
      }

      // Save the teacher data to Supabase
      const { error } = await supabase
        .from('teachers')
        .insert([{ name, grades, subjects, roster_file_url: rosterFileUrl }]);

      if (error) {
        console.error('Error saving teacher data:', error);
      } else {
        router.push('/dashboard'); // Redirect to dashboard or another page after onboarding
      }
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, rosterFile: event.target.files[0] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 && (
          <div className="question">
            <h2 className="text-xl font-semibold mb-4">What is your name?</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="question">
            <h2 className="text-xl font-semibold mb-4">
              What grades do you teach?
            </h2>
            <input
              type="text"
              name="grades"
              value={formData.grades}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              Upload a roster of students
            </h2>
            <input
              type="file"
              accept=".csv,.xls,.xlsx,.txt"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
};

export default OnboardTeacher;
