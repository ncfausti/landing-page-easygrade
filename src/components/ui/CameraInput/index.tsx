import React, { useRef, useEffect } from 'react';
import { uploadPhoto } from '../../../lib/sb';

const CameraInput = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    } else {
      alert('Your browser does not support media devices.');
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      const { videoWidth, videoHeight } = video;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      // Optionally, you can convert the canvas to a data URL to save or process
      const imageDataUrl = canvas.toDataURL('image/png');
      console.log(imageDataUrl); // For demonstration purposes: log the data URL
      // Get data URL and convert it to Blob
      // const imageDataUrl = canvas.toDataURL('image/png');
      const imageBlob = dataURLtoBlob(imageDataUrl);

      // Convert Blob to File
      const imageFile = blobToFile(imageBlob, 'captured-image.png');

      // Use the file for further operations like uploading or saving
      console.log('blobToFile', imageFile); // Logging to see the file properties
      await uploadPhoto(imageFile);
    }
  };

  return (
    <div>
      <h1>Camera Test</h1>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        id="video-preview"
        playsInline
        muted
      ></video>
      <button onClick={handleCapture}>Capture</button>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type });
}

export default CameraInput;
