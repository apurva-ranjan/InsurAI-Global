import React, { useState } from 'react'; // Added useState
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Menu, X } from 'lucide-react'; // Added icons for mobile toggle

// Layout & Components
import Sidebar from './Sidebar'; 

// Page Imports
import DashboardOverview from './pages/DashboardOverview';
import PolicyListing from './pages/PolicyListing';
import ApplicationStatus from './pages/ApplicationStatus';
import Documents from './pages/Documents';
import AdminUserManagement from './pages/AdminUserManagement';
import Reports from './pages/Reports';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

// --- THE GATEKEEPER COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  return isAuth ? children : <Navigate to="/login" replace />;
};

// --- THE LAYOUT WRAPPER ---
const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  const isPublicPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isPublicPage) return <>{children}</>;

  return (
    <div className="app-container">
      {/* 1. Sidebar with dynamic class for mobile visibility */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'show' : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* 2. Overlay for mobile when sidebar is open */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* 3. Main Content Area */}
      <div className="main-content">
        <nav className="navbar navbar-light bg-white border-bottom px-3 px-md-4 py-3 shadow-sm sticky-top">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              {/* Mobile Hamburger Menu */}
              <button 
                className="btn btn-light d-lg-none border-0" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div>
                <span className="text-muted small d-none d-sm-block" style={{ letterSpacing: '1px' }}>ENTERPRISE PORTAL</span>
                <span className="h5 mb-0 fw-bold text-dark">InsurAI <span className="text-primary">Global</span></span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="text-end d-none d-md-block">
                <span className="fw-bold d-block small">Admin User</span>
                <span className="text-success small" style={{ fontSize: '10px' }}>● System Online</span>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=0d6efd&color=fff&bold=true" 
                className="rounded-circle border shadow-sm" width="35" height="35" alt="Admin" 
              />
            </div>
          </div>
        </nav>
        
        <div className="content-padding">{children}</div>
      </div>

      {/* 4. Responsive CSS Logic */}
      <style>{`
        .app-container { display: flex; min-height: 100vh; background-color: #f8f9fa; }
        
        /* Sidebar Styling */
        .sidebar-wrapper {
          width: 260px;
          position: fixed;
          height: 100vh;
          z-index: 1050;
          transition: transform 0.3s ease;
        }

        .main-content {
          flex: 1;
          margin-left: 260px; /* Default desktop margin */
          width: 100%;
          transition: margin-left 0.3s ease;
        }

        .content-padding { padding: 20px; }

        /* Mobile Adjustments (Under 992px) */
        @media (max-width: 991px) {
          .sidebar-wrapper {
            transform: translateX(-100%); /* Hide sidebar off-screen */
          }
          .sidebar-wrapper.show {
            transform: translateX(0); /* Slide in */
          }
          .main-content {
            margin-left: 0; /* Content takes full width */
          }
          .sidebar-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); z-index: 1040;
          }
          .content-padding { padding: 15px; }
        }

        @media (min-width: 992px) {
          .sidebar-wrapper { transform: translateX(0) !important; }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/policies" element={<PolicyListing />} />
                <Route path="/status" element={<ApplicationStatus />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/admin-users" element={<AdminUserManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/logs" element={<ActivityLogs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;