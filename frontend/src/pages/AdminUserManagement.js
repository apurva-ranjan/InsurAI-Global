import React, { useState } from 'react';
import { UserPlus, Mail, Trash2, Edit, ShieldCheck } from 'lucide-react';

const AdminUserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joined: 'Jan 12, 2026' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@pro.com', role: 'Agent', joined: 'Jan 15, 2026' },
  ]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">User Management</h2>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <table className="table table-hover mb-0">
          <thead className="bg-light">
            <tr className="small text-muted text-uppercase">
              <th className="ps-4">User</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="align-middle">
                <td className="ps-4">
                  <div className="d-flex align-items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} className="rounded-circle" width="35" alt="user" />
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      <div className="text-muted small">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.role === 'Agent' ? 'bg-info' : 'bg-light text-dark'} px-3`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joined}</td>
                <td className="text-end pe-4">
                  <button className="btn btn-sm btn-outline-secondary me-2"><Edit size={14} /></button>
                  <button className="btn btn-sm btn-outline-danger"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;