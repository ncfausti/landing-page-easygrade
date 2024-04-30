// import { DocumentScanner } from 'opencv-document-scanner';
// import dynamic from 'next/dynamic';
// 'use client';
// import CameraInput from '@/components/ui/CameraInput';
// import ImageUpload from '@/components/ImageUpload';

// const useFileURL = async (fileUrl) => {
//   try {
//     const response = await fetch('/api/process', {
//       // Another API endpoint
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ fileUrl }),
//     });
//     const result = await response.json();
//     console.log('Result from processing file:', result);
//   } catch (error) {
//     console.error('Error using file URL:', error);
//   }
// };

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
      {/* <ImageUpload />
      <CameraInput /> */}
      <h1>Grade</h1>
    </>
  );
}
