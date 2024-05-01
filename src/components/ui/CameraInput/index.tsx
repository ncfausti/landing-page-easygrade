import React, { useEffect, useRef, useState } from 'react';
import { uploadPhoto } from '../../../lib/sb';
import { v4 as uuidv4 } from 'uuid';
import { CameraIcon } from '../../../components/ui/Icons/Camera';
import { ToggleIcon } from '../Icons/Toggle';

const CameraInput = () => {
  const [facingMode, setFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [gptResponseJson, setGptResponseJson] = useState({ choices: [] });

  useEffect(() => {
    async function checkCameraAvailability() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      console.log(videoInputs);
      const hasRearCamera = videoInputs.some((device) => {
        return /back|rear|environment/i.test(device.label);
      });

      if (hasRearCamera) {
        setFacingMode('environment'); // Set to rear camera if available
      } else {
        setFacingMode('user'); // Fallback to front camera
      }

      startVideo(); // Then get the video stream
    }

    const startVideo = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Stop any video streams if they are running
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject
              .getTracks()
              .forEach((track) => track.stop());
          }

          // Request video stream
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { exact: facingMode },
              width: { exact: 2048 },
              height: { exact: 1536 },
            },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing the camera:', error);
          // Stop any video streams if they are running
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject
              .getTracks()
              .forEach((track) => track.stop());
          }

          // Request video stream
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { exact: 1024 },
              height: { exact: 1024 },
            },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      }
    };

    checkCameraAvailability();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

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
      const imageFile = blobToFile(imageBlob, `${uuidv4()}.png`);

      // Use the file for further operations like uploading or saving
      console.log('blobToFile', imageFile); // Logging to see the file properties
      await uploadPhoto(imageFile);
      const gptResponse = await fetch('/api', {
        method: 'POST',
        body: imageDataUrl,
      });
      const gptResponseJson = await gptResponse.json();
      console.log(gptResponseJson);
      setGptResponseJson(gptResponseJson);
    }
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) =>
      prevMode === 'environment' ? 'user' : 'environment'
    );
  };
  return (
    <div className="flex flex-col items-center">
      {/* <select
        className="hidden"
        onChange={handleChange}
        value={selectedDeviceId}
      >
        {devices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select> */}
      <div className="w-1/3 h-1/3 p-5">
        <video
          ref={videoRef}
          width="2048"
          height="1536"
          autoPlay
          id="video-preview"
          playsInline
          muted
        ></video>
      </div>
      <canvas
        className="w-1/5"
        ref={canvasRef}
        style={{ display: 'block' }}
      ></canvas>
      <code className="bg-white p-5 font-bold w-2/3">
        {gptResponseJson.choices.map((c) => c.message.content)}
      </code>

      <div className="p-3">
        <button
          className="btn border-2 border-black rounded-full p-1"
          onClick={handleCapture}
        >
          <CameraIcon />
        </button>
        <button className="pl-3" onClick={toggleCamera}>
          <ToggleIcon />
        </button>
      </div>
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
