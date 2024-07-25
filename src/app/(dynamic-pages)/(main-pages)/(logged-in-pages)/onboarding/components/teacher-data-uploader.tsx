'use client';
import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
// import { submitUserList } from '@/data/user/teachers';
import startBackgroundJob from '@/app/actions/start-background-job';

interface TeacherSignupUser {
  name: string;
  email: string;
}

const TeacherDataUploader = () => {
  const [file, setFile] = useState(null);
  const [manualData, setManualData] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [parsedData, setParsedData] = useState<TeacherSignupUser[]>([]);
  const fileInputRef = useRef(null);
  const [userList, setUserList] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleManualDataChange = (e) => {
    setManualData(e.target.value);
  };

  const validateManualData = () => {
    if (!manualData.trim()) {
      setError('Data must be provided.');
      return false;
    }

    const rows = manualData.trim().split('\n');
    for (const row of rows) {
      const parts = row.split(/[,\t]/);
      if (parts.length < 2) {
        setError(
          'Each row must contain a teacher name and email separated by a tab or comma.'
        );
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const data = await readExcel(file);
        console.log('Data:', data);
        setParsedData(data as TeacherSignupUser[]);
        setShowModal(true);
      } else if (validateManualData()) {
        const data = processManualData();
        setParsedData(data);
        setShowModal(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // async function handleJobBtnClick() {
  //   await startBackgroundJob();
  // }

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length < 2) {
            throw new Error('The file does not contain enough data.');
          }

          const [headers, ...rows] = jsonData;

          const nameIndex = headers.findIndex((h) =>
            h.toLowerCase().includes('name')
          );
          const emailIndex = headers.findIndex((h) =>
            h.toLowerCase().includes('email')
          );

          console.log(nameIndex, emailIndex, headers, rows);

          if (nameIndex === -1 || emailIndex === -1) {
            throw new Error(
              'The file must contain columns for teacher name and email.'
            );
          }

          const formattedData = rows
            .map((row) => ({
              name: row[nameIndex],
              email: row[emailIndex],
            }))
            .filter((row) => row.name && row.email);

          resolve(formattedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const processManualData = () => {
    return manualData
      .trim()
      .split('\n')
      .map((row) => {
        const [name, email] = row.split(/[,\t]/);
        return {
          name: name.trim(),
          email: email.trim(),
        };
      });
  };

  const handleConfirm = async () => {
    console.log('Confirmed data:', parsedData);
    // console.log('User list:', userList)
    // Here you would typically send this data to your backend
    const users = parsedData.map((user: { name: string; email: string }) => {
      const { name, email } = user;
      return { name, email };
    });
    await startBackgroundJob(users);

    console.log(userList);
    // await submitUserList(users);
    setUserList('');
    alert('User list submitted successfully!');
    setShowModal(false);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const users = userList.split('\n').map((line) => {
  //     const [name, email] = line.split(',').map((item) => item.trim());
  //     return { name, email };
  //   });
  //   await submitUserList(users);
  //   setUserList('');
  //   alert('User list submitted successfully!');
  // };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Data Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Upload XLS, XLSX, or CSV file:</label>
          <label className="block mb-2 text-xs">
            Please include a header row with columns for{' '}
            <strong>full name</strong> and <strong>email</strong>.
          </label>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <div className="text-center">
          <h3>OR</h3>
        </div>
        <div>
          <label className="block mb-2">
            Enter teacher data (Name, Email - one per line, separated by tab or
            comma):
          </label>
          <textarea
            name="teachers"
            value={manualData}
            onChange={handleManualDataChange}
            className="w-full p-2 border rounded"
            rows={10}
            placeholder={`John Doe, john@example.com\nJane Smith	jane@example.com`}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Preview Data
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">Confirm Data</h3>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="border p-2">Teacher Name</th>
                  <th className="border p-2">Teacher Email</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row: TeacherSignupUser, index) => (
                  <tr key={index}>
                    <td className="border p-2">{row.name}</td>
                    <td className="border p-2">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDataUploader;
