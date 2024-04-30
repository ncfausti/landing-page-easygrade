import React, { useState } from 'react';
import { uploadPhoto } from '../../lib/sb';

function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUploadAuto = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result as string);
      };
      reader.readAsDataURL(file);
      await uploadPhoto(file);
    }
  };

  return (
    <div>
      Image uploaded when selected from browser.
      <input type="file" accept="image/*" onChange={handleImageUploadAuto} />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
      )}
    </div>
  );
}

export default ImageUpload;
