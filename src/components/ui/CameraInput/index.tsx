'use client';
import React, { useState } from 'react';

function CameraInput() {
  const [image, setImage] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
      />
      {image && (
        <img
          src={image}
          alt="Captured"
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </div>
  );
}

export default CameraInput;
