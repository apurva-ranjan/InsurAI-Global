import React, { useState } from 'react';
import { User, Lock, Bell, Moon, Globe, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Account Settings</h2>
        <button onClick={handleSave} className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="row g-4">
        {/* Left Column: Profile & Security */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center gap-2 mb-4">
              <User className="text-primary" size={22} />
              <h5 className="mb-0 fw-bold">Personal Information</h5>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Full Name</label>
                <input type="text" className="form-control bg-light border-0" defaultValue="Admin User" />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Email Address</label>
                <input type="email" className="form-control bg-light border-0" defaultValue="admin@insurai.com" />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Organization</label>
                <input type="text" className="form-control bg-light border-0" defaultValue="InsurAI Global Enterprises" />
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
            <div className="d-flex align-items-center gap-2 mb-4">
              <Lock className="text-danger" size={22} />
              <h5 className="mb-0 fw-bold">Security</h5>
            </div>
            <button className="btn btn-outline-danger btn-sm fw-bold">Change Password</button>
            <hr className="my-3 opacity-25" />
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" defaultChecked />
              <label className="form-check-label small fw-bold">Two-Factor Authentication (2FA)</label>
            </div>
          </div>
        </div>

        {/* Right Column: Preferences */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '15px' }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Bell size={20} className="text-warning" /> Notifications
            </h5>
            <div className="d-flex flex-column gap-3">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label small">Email Alerts</label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
                <label className="form-check-label small">System Logs</label>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Globe size={20} className="text-info" /> Preferences
            </h5>
            <div className="mb-3">
              <label className="form-label small fw-bold">Language</label>
              <select className="form-select bg-light border-0 small">
                <option>English (US)</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="form-check form-switch d-flex justify-content-between align-items-center p-0">
              <label className="small fw-bold d-flex align-items-center gap-2">
                <Moon size={16} /> Dark Mode
              </label>
              <input 
                className="form-check-input ms-0" 
                type="checkbox" 
                onChange={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;