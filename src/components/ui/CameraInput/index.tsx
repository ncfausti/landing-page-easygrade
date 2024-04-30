import React, { useEffect, useRef, useState } from 'react';
import { uploadPhoto } from '../../../lib/sb';
import { v4 as uuidv4 } from 'uuid';

const CameraInput = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  // const videoRef = useRef(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log('devices', devices);
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing devices:', error);
      }
    };

    getDevices();
  }, [devices]);

  useEffect(() => {
    const startVideo = async () => {
      if (selectedDeviceId) {
        const constraints = {
          video: {
            facingMode: { exact: 'environment' },
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  const handleChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

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
      const imageFile = blobToFile(imageBlob, `${uuidv4()}.png`);

      // Use the file for further operations like uploading or saving
      console.log('blobToFile', imageFile); // Logging to see the file properties
      await uploadPhoto(imageFile);
    }
  };

  return (
    <div>
      <h1>Camera Test</h1>
      <select onChange={handleChange} value={selectedDeviceId}>
        {devices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
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

// const CameraSelector = () => {
//   const [devices, setDevices] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState('');
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const getDevices = async () => {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(
//           (device) => device.kind === 'videoinput'
//         );
//         setDevices(videoDevices);
//         if (videoDevices.length > 0) {
//           setSelectedDeviceId(videoDevices[0].deviceId);
//         }
//       } catch (error) {
//         console.error('Error accessing devices:', error);
//       }
//     };

//     getDevices();
//   }, []);

//   useEffect(() => {
//     const startVideo = async () => {
//       if (selectedDeviceId) {
//         const constraints = {
//           video: {
//             deviceId: { exact: selectedDeviceId },
//           },
//         };

//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         videoRef.current.srcObject = stream;
//       }
//     };

//     startVideo();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [selectedDeviceId]);

//   const handleChange = (event) => {
//     setSelectedDeviceId(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Select Camera</h1>
//       <select onChange={handleChange} value={selectedDeviceId}>
//         {devices.map((device, index) => (
//           <option key={device.deviceId} value={device.deviceId}>
//             {device.label || `Camera ${index + 1}`}
//           </option>
//         ))}
//       </select>
//       <video ref={videoRef} width="640" height="480" autoPlay></video>
//     </div>
//   );
// };
