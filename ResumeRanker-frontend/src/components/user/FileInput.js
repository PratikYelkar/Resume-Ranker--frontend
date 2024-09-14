// src/components/FileUploader.js
import React, { useState } from 'react';

const FileUploader = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];    
    setUploadedFile(file);
  };

  return (
    <div>
      <label>Upload your resume (PDF):</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
    </div>
  );
};

export default FileUploader;
