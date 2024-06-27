// import { DocumentScanner } from 'opencv-document-scanner';
// import dynamic from 'next/dynamic';
'use client';
import CameraInput from '@/components/ui/CameraInput';
import ImageUploader from './components/image-uploader';

// import { pdfjsLib } from '@/scripts/pdfjs/pdf.mjs';
// import { pdfjsWorker } from '@/scripts/pdfjs/pdf.worker.mjs';

export default function Grade() {
  return (
    <>
      <CameraInput />
      <ImageUploader bucketName="homework" />
    </>
  );
}
