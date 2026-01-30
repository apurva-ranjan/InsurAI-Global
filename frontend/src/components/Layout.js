import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Menu, X, LayoutDashboard, FileText, 
  Settings, Users, LogOut, Briefcase 
} from 'lucide-react';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Policies', path: '/policies', icon: <Briefcase size={20} /> },
        { name: 'Applications', path: '/applications', icon: <FileText size={20} /> },
        { name: 'Users', path: '/users', icon: <Users size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-vh-100 d-flex bg-light">
            {/* MOBILE NAVBAR */}
            <div className="d-lg-none position-fixed top-0 start-0 end-0 bg-dark text-white p-3 d-flex justify-content-between align-items-center z-3 shadow">
                <div className="d-flex align-items-center gap-2">
                    <Shield className="text-primary" />
                    <span className="fw-bold">InsurAI</span>
                </div>
                <button className="btn btn-dark p-1" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* RESPONSIVE SIDEBAR */}
            <aside className={`sidebar-container bg-dark text-white transition-all ${isOpen ? 'show' : ''}`}>
                <div className="p-4 d-none d-lg-flex align-items-center gap-3 mb-4">
                    <Shield size={32} className="text-primary" />
                    <h4 className="mb-0 fw-bold">InsurAI</h4>
                </div>

                <nav className="flex-grow-1 px-3">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`nav-link-custom ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-3 mt-auto">
                    <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill">
                        <LogOut size={18} /> <span className="d-lg-inline">Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="main-content flex-grow-1">
                <div className="container-fluid p-4 p-md-5 mt-5 mt-lg-0">
                    {children}
                </div>
            </main>

            <style>{`
                .sidebar-container {
                    width: 260px;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1040;
                    display: flex;
                    flex-direction: column;
                }

                .nav-link-custom {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #adb5bd;
                    text-decoration: none;
                    border-radius: 12px;
                    margin-bottom: 8px;
                    transition: all 0.3s;
                }

                .nav-link-custom:hover, .nav-link-custom.active {
                    background: rgba(13, 110, 253, 0.15);
                    color: #0d6efd;
                }

                .main-content {
                    margin-left: 260px;
                    transition: all 0.3s;
                }

                /* Mobile Adjustments */
                @media (max-width: 991.98px) {
                    .sidebar-container {
                        left: -260px;
                    }
                    .sidebar-container.show {
                        left: 0;
                    }
                    .main-content {
                        margin-left: 0;
                    }
                }

                .transition-all { transition: all 0.3s ease-in-out; }
            `}</style>
        </div>
    );
};

export default Layout;