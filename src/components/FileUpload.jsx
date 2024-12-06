import React, { useState } from 'react';
import { uploadFile } from '../utils/file_upload';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploadStatus('Uploading...');
    const uploadUrl = `${process.env.REACT_APP_BACKEND_URL}/upload`;
    const result = await uploadFile(file, uploadUrl);

    if (result.success) {
      setUploadStatus('File uploaded successfully!');
      console.log('Upload Response Data:', result.data); // Log success response
    } else {
      setUploadStatus('Failed to upload file.');
      console.error('Upload Error Data:', result.error); // Log error response
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>File Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
