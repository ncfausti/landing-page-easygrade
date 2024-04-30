import React, { useRef, useEffect } from 'react';

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

  const handleCapture = () => {
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
    }
  };

  return (
    <div>
      <h1>Camera Test</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <button onClick={handleCapture}>Capture</button>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
};

export default CameraInput;
