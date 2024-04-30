// import { DocumentScanner } from 'opencv-document-scanner';
// import dynamic from 'next/dynamic';
'use client';
import { useState } from 'react';
import CameraInput from '@/components/ui/CameraInput';
import ImageUpload from '@/components/ImageUpload';

const useFileURL = async (fileUrl) => {
  try {
    const response = await fetch('/api/process', {
      // Another API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileUrl }),
    });
    const result = await response.json();
    console.log('Result from processing file:', result);
  } catch (error) {
    console.error('Error using file URL:', error);
  }
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      // Your API endpoint
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.url) {
      useFileURL(data.url); // Next step using the file URL
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      await uploadFile();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default function Grade() {
  // const NonSSRCameraScanner = dynamic(
  //   () => import('@/components/ui/CameraScanner'),
  //   {
  //     ssr: false,
  //   }
  // );

  return (
    <>
      {/* <NonSSRCameraScanner /> */}
      {/* <FileUpload /> */}
      <ImageUpload />
      {/* <CameraInput /> */}
    </>
  );
}
