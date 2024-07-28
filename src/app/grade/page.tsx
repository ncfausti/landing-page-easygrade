// import { DocumentScanner } from 'opencv-document-scanner';
// import dynamic from 'next/dynamic';
'use client';
import CameraInput from '@/components/ui/CameraInput';
// import ImageUploader from './components/image-uploader';

// import { pdfjsLib } from '@/scripts/pdfjs/pdf.mjs';
// import { pdfjsWorker } from '@/scripts/pdfjs/pdf.worker.mjs';

// camerainput is not linking up to the assignment ID or anything
// currently
// need to add the assignment ID to the camerainput and
export default function Grade() {
  return (
    <>
      <CameraInput />
      {/* <ImageUploader bucketName="homework" /> */}
    </>
  );
}
