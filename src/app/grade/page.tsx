// import { DocumentScanner } from 'opencv-document-scanner';
// import dynamic from 'next/dynamic';
'use client';
import CameraInput from '@/components/ui/CameraInput';
// import { pdfjsLib } from '@/scripts/pdfjs/pdf.mjs';
// import { pdfjsWorker } from '@/scripts/pdfjs/pdf.worker.mjs';

export default async function Grade() {
  return (
    <>
      <CameraInput />
    </>
  );
}
