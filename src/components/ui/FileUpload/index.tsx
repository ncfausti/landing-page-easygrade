import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import './styles.css';

const fileTypes = ['PDF', 'JPEG', 'PNG', 'GIF'];

export default function FileUpload(props) {
  const [file, setFile] = useState(null);
  const { onFileChange } = props;
  const handleChange = (file) => {
    console.log(file);
    onFileChange(file);
    setFile(file);
  };
  return (
    <div className="file-upload">
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : ''}</p>
    </div>
  );
}

// the input change is how we were previouslly setting the canvas
// images
