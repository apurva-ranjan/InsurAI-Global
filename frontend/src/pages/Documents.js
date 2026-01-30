import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Trash2, Shield } from 'lucide-react';

const Documents = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'National_ID_Front.pdf', size: '1.2 MB', status: 'Verified' },
    { id: 2, name: 'Medical_Checkup_Report.png', size: '2.5 MB', status: 'Pending' }
  ]);

  const handleUploadClick = () => {
    alert("In a production app, this would trigger the system file picker and upload to a secure S3 bucket.");
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Document Center</h2>
        <span className="badge bg-soft-primary text-primary p-2">
          <Shield size={14} className="me-1"/> SSL Encrypted Storage
        </span>
      </div>

      <div className="row g-4">
        {/* Left Side: Upload Zone */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4 text-center h-100" 
               style={{ border: '2px dashed #0d6efd', backgroundColor: '#f0f7ff', borderRadius: '20px' }}>
            <div className="py-5">
              <UploadCloud size={64} className="text-primary mb-3 mx-auto" />
              <h5 className="fw-bold">Upload New Document</h5>
              <p className="text-muted small px-4">Drag and drop your files here or click to browse. Supports PDF, PNG, and JPG.</p>
              <button onClick={handleUploadClick} className="btn btn-primary px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                Select Files
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: File List */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
            <h5 className="fw-bold mb-4">Your Uploaded Documents</h5>
            <div className="d-flex flex-column gap-3">
              {files.map(file => (
                <div key={file.id} className="d-flex align-items-center justify-content-between p-3 border rounded-3 bg-light">
                  <div className="d-flex align-items-center">
                    <div className="p-2 bg-white rounded shadow-sm me-3 text-primary">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold small">{file.name}</h6>
                      <small className="text-muted">{file.size} • {file.status}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {file.status === 'Verified' ? 
                      <CheckCircle size={20} className="text-success" /> : 
                      <span className="badge bg-warning text-dark small">Pending</span>
                    }
                    <button className="btn btn-link text-danger p-0 ms-2"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;