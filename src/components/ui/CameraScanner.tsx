'use client';
import jscanify from 'jscanify';
// import { useRef } from 'react';

// function CameraScanner() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const resultRef = useRef(null);
//   const scanner = new jscanify();
//   scanner.loadOpenCV(function (cv) {
//     scanner.extractPaper();
//   });
//   const canvasCtx = canvasRef.current.getContext('2d');
//   const resultCtx = resultRef.current.getContext('2d');
//   navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//     videoRef.current.srcObject = stream;
//     videoRef.current.onloadedmetadata = () => {
//       videoRef.current.play();

//       setInterval(() => {
//         canvasCtx.drawImage(videoRef.current, 0, 0);
//         const resultCanvas = scanner.highlightPaper(canvasRef.current);
//         resultCtx.drawImage(resultCanvas, 0, 0);
//       }, 10);
//     };
//   });
//   return (
//     <>
//       <video ref={videoRef} width="320" height="240" controls preload="none">
//         <source src="/path/to/video.mp4" type="video/mp4" />
//         <track
//           src="/path/to/captions.vtt"
//           kind="subtitles"
//           srcLang="en"
//           label="English"
//         />
//         Your browser does not support the video tag.
//       </video>
//       <canvas id="canvas" ref={canvasRef}></canvas>
//       <canvas id="result" ref={resultRef}></canvas>
//     </>
//   );
// }
// export default CameraScanner;
import { useEffect, useRef, useState } from 'react';
import './scanner.css';

const images = [{ src: '/paper-high.png' }, { src: '/paper-2.png' }];

export const CameraScanner = () => {
  const containerRef = useRef(null);
  const openCvURL = 'https://docs.opencv.org/4.7.0/opencv.js';

  const [loadedOpenCV, setLoadedOpenCV] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const scanner = new jscanify();
    loadOpenCv(() => {
      if (selectedImage) {
        containerRef.current.innerHTML = '';
        const newImg = document.createElement('img');
        newImg.src = selectedImage.src;

        newImg.onload = function () {
          const resultCanvas = scanner.extractPaper(newImg, 386, 500);
          containerRef.current.append(resultCanvas);

          const highlightedCanvas = scanner.highlightPaper(newImg);
          containerRef.current.append(highlightedCanvas);
        };
      }
    });
  }, [selectedImage]);

  const loadOpenCv = (onComplete) => {
    const isScriptPresent = !!document.getElementById('open-cv');
    if (isScriptPresent || loadedOpenCV) {
      setLoadedOpenCV(true);
      onComplete();
    } else {
      const script = document.createElement('script');
      script.id = 'open-cv';
      script.src = openCvURL;

      script.onload = function () {
        setTimeout(function () {
          onComplete();
        }, 1000);
        setLoadedOpenCV(true);
      };
      document.body.appendChild(script);
    }
  };

  return (
    <>
      <div className="scanner-container">
        <div>
          {!loadedOpenCV && (
            <div>
              <h2>Loading OpenCV...</h2>
            </div>
          )}
          {images.map((image, index) => (
            <img
              key={index}
              className={
                selectedImage && selectedImage.src === image.src
                  ? 'selected'
                  : ''
              }
              src={image.src}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div ref={containerRef} id="result-container"></div>
      </div>
    </>
  );
};
