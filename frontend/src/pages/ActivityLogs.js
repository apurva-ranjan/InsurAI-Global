import React from 'react';
import { Activity, Clock, ShieldAlert, User } from 'lucide-react';

const ActivityLogs = () => {
  const logs = [
    { id: 1, action: "PDF Report Generated", user: "Admin", time: "2 mins ago", type: "info" },
    { id: 2, action: "Policy 'Ride Safe' Updated", user: "Admin", time: "45 mins ago", type: "warning" },
    { id: 3, action: "New User Registered", user: "System", time: "2 hours ago", type: "success" },
    { id: 4, action: "Failed Login Attempt", user: "Unknown", time: "5 hours ago", type: "danger" },
  ];

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">System Activity Logs</h2>
        <span className="text-muted small">Real-time Audit Trail</span>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="list-group list-group-flush">
          {logs.map(log => (
            <div key={log.id} className="list-group-item p-3 border-0 border-bottom d-flex align-items-center justify-content-between hover-bg-light">
              <div className="d-flex align-items-center gap-3">
                <div className={`p-2 rounded-circle bg-soft-${log.type} text-${log.type}`}>
                  {log.type === 'danger' ? <ShieldAlert size={18} /> : <Activity size={18} />}
                </div>
                <div>
                  <div className="fw-bold small">{log.action}</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    <User size={10} className="me-1" /> {log.user} • <Clock size={10} className="me-1" /> {log.time}
                  </div>
                </div>
              </div>
              <span className={`badge bg-soft-${log.type} text-${log.type} border-0`}>{log.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;