import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Search, Eye } from 'lucide-react';

const ApplicationStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Professional Mock Data for Applications
  const initialApps = [
    { id: 'APP-9821', policy: 'Premium Health Shield', date: '2026-01-20', status: 'Approved', amount: '$2,500' },
    { id: 'APP-9845', policy: 'Ride Safe Insurance', date: '2026-01-22', status: 'Pending', amount: '$800' },
    { id: 'APP-9901', policy: 'Cyber Security Plus', date: '2026-01-23', status: 'Under Review', amount: '$1,200' },
    { id: 'APP-8762', policy: 'Family Care Life', date: '2025-12-15', status: 'Rejected', amount: '$5,000' },
  ];

  // Logic for Status Badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="badge bg-soft-success text-success px-3 py-2"><CheckCircle size={14} className="me-1"/> Approved</span>;
      case 'Pending': return <span className="badge bg-soft-warning text-warning px-3 py-2"><Clock size={14} className="me-1"/> Pending</span>;
      case 'Under Review': return <span className="badge bg-soft-primary text-primary px-3 py-2"><Search size={14} className="me-1"/> Under Review</span>;
      case 'Rejected': return <span className="badge bg-soft-danger text-danger px-3 py-2"><XCircle size={14} className="me-1"/> Rejected</span>;
      default: return <span className="badge bg-light text-dark px-3 py-2">{status}</span>;
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Application Tracking</h2>
        <div className="input-group w-25">
          <span className="input-group-text bg-white border-end-0"><Search size={18} className="text-muted"/></span>
          <input type="text" className="form-control border-start-0" placeholder="Search ID..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="small text-uppercase text-muted fw-bold">
                <th className="ps-4 py-3">Reference ID</th>
                <th className="py-3">Policy Name</th>
                <th className="py-3">Date Submitted</th>
                <th className="py-3">Coverage Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {initialApps.filter(a => a.id.includes(searchTerm.toUpperCase())).map(app => (
                <tr key={app.id}>
                  <td className="ps-4 fw-bold">{app.id}</td>
                  <td>{app.policy}</td>
                  <td>{app.date}</td>
                  <td className="fw-bold">{app.amount}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td className="text-end pe-4">
                    <button className="btn btn-light btn-sm border">
                      <Eye size={16} className="me-1"/> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;