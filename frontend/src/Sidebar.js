import React from 'react';
import { Home, Shield, BarChart2, Users, Settings, LogOut, Clock, FileText, Activity } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to highlight the active menu item
  const isActive = (path) => location.pathname === path ? 'bg-primary text-white shadow-sm' : 'text-white-50';

  // --- THE LOGOUT LOGIC ---
  const handleLogout = () => {
    // 1. Clear the 'Gatekeeper' flag from localStorage
    localStorage.removeItem('isAuthenticated');
    
    // 2. Clear the secure session token received from the Java Backend
    localStorage.removeItem('sessionToken');
    
    // 3. Notify the user with a professional toast
    toast.success("Security session terminated.");
    
    // 4. Redirect to the elite login screen
    navigate('/login');
  };

  return (
    <div className="bg-dark text-white vh-100 p-3 shadow" style={{ width: '260px', position: 'fixed', zIndex: 1000 }}>
      <div className="mb-4 ps-2 pt-2">
        <h3 className="h4 mb-0 fw-bold">
          InsurAI <span className="text-primary">Global</span>
        </h3>
      </div>

      <nav className="nav flex-column gap-1">
        <Link to="/" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/')}`}>
          <Home size={20} /> Overview
        </Link>
        <Link to="/policies" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/policies')}`}>
          <Shield size={20} /> Browse Policies
        </Link>
        <Link to="/status" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/status')}`}>
          <Clock size={20} /> My Applications
        </Link>
        <Link to="/documents" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/documents')}`}>
          <FileText size={20} /> Document Center
        </Link>

        <div className="mt-4 mb-2 ps-2">
          <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '10px', letterSpacing: '1px' }}>Management</small>
        </div>
        
        <Link to="/admin-users" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/admin-users')}`}>
          <Users size={20} /> User Management
        </Link>
        <Link to="/reports" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/reports')}`}>
          <BarChart2 size={20} /> Reports
        </Link>
        <Link to="/logs" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/logs')}`}>
          <Activity size={20} /> System Logs
        </Link>

        {/* --- BOTTOM SECTION: Settings and Sign Out --- */}
        <div className="mt-auto" style={{ position: 'absolute', bottom: '20px', width: '220px' }}>
          <hr className="bg-secondary opacity-25" />
          <Link to="/settings" className={`nav-link rounded-3 d-flex align-items-center gap-3 py-2 ${isActive('/settings')}`}>
            <Settings size={20} /> Settings
          </Link>
          
          {/* UPDATED BUTTON: Calls handleLogout on click */}
          <button 
            onClick={handleLogout} 
            className="nav-link text-danger border-0 bg-transparent d-flex align-items-center gap-3 w-100 mt-1 py-2 text-start"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;