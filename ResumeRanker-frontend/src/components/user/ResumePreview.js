import React from 'react';

const ResumePreview = ({ resumeData }) => {
  return (
    <div>
      <h2>Resume Preview</h2>
      <iframe 
        title="Resume Preview"
        src={`data:application/pdf;base64,${resumeData}`}
        width="100%"
        height="500px"
      ></iframe>
    </div>
  );
};

export default ResumePreview;
