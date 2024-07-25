'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SchoolOnboarding = () => {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    schoolName: '',
    numberOfTeachers: '',
    homeworkPolicy: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfiguration((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    alert('submitted!');
  };

  const slideIn = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { x: '-100%' },
  };

  const homeworkPolicyOptions = [
    { value: 'daily', label: 'Every day' },
    { value: 'every_2nd_day', label: 'Every 2nd day' },
    { value: 'every_3rd_day', label: 'Every 3rd day' },
    { value: 'every_4th_day', label: 'Every 4th day' },
    { value: 'every_5th_day', label: 'Every 5th day' },
    { value: 'weekly', label: 'Once per week' },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 ">
      <h2 className="text-2xl font-bold mb-4">School Configuration</h2>
      <form>
        {step === 1 && (
          <motion.div initial="hidden" animate="visible" exit="exit">
            <label className="block mb-2">Name of School</label>
            <input
              type="text"
              name="schoolName"
              value={configuration.schoolName}
              onChange={handleInputChange}
              onKeyPress={handleNextStep}
              className="w-full p-2 border rounded"
              autoFocus
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideIn}
          >
            <label className="block mb-2">Number of Teachers</label>
            <input
              type="number"
              name="numberOfTeachers"
              value={configuration.numberOfTeachers}
              onChange={handleInputChange}
              onKeyPress={handleNextStep}
              className="w-full p-2 border rounded"
              autoFocus
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideIn}
          >
            <label className="block mb-2">Homework Policy</label>
            <p className="text-sm text-gray-600 mb-2">
              On average, how often is new homework assigned to schedule HW?
            </p>
            <select
              name="homeworkPolicy"
              value={configuration.homeworkPolicy}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              autoFocus
            >
              <option value="">Select a policy</option>
              {homeworkPolicyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </form>

      {/* Navigation buttons */}
      <div className="mt-4 flex justify-end">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNextStep}
            className="px-4 ml-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 ml-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </div>

      {/* Display the current configuration object */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Current Configuration:</h3>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(configuration, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SchoolOnboarding;
