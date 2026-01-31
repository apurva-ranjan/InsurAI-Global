import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Shield, Plus, X, Trash2, Save, ArrowRight, ExternalLink } from 'lucide-react';

const PolicyListing = () => {
    const [policies, setPolicies] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ policyName: '', category: 'Health', premium: '', coverage: '' });

    // --- CONFIGURATION ---
    // Using your live Railway backend URL
    const BASE_URL = 'https://insurai-global-production.up.railway.app/api/policies';

    useEffect(() => { fetchPolicies(); }, []);

    const fetchPolicies = async () => {
        try {
            // Added withCredentials for CORS compatibility
            const res = await axios.get(BASE_URL, { withCredentials: true });
            setPolicies(res.data);
            setLoading(false);
        } catch (err) { 
            console.error("Fetch Error:", err);
            toast.error("Database Connection Failed"); 
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading("Saving to Cloud...");
        try {
            await axios.post(`${BASE_URL}/add`, form, { withCredentials: true });
            toast.success("Policy Secured Successfully", { id: loadToast });
            setIsSidebarOpen(false);
            fetchPolicies();
        } catch (err) { 
            toast.error("Save Failed: Check Backend Logs", { id: loadToast }); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently remove this policy?")) {
            try {
                await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
                toast.success("Policy Removed");
                fetchPolicies();
            } catch (err) { 
                toast.error("Delete Action Failed"); 
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
                <div className="spinner-grow text-primary mb-3" role="status"></div>
                <p className="text-muted fw-bold">Synchronizing with InsurAI Cloud...</p>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light pb-5">
            {/* --- MODERN GLASSMORPHIC NAVBAR --- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-3 px-md-5 sticky-top shadow">
                <div className="container-fluid d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <div className="p-2 bg-primary rounded-3">
                            <Shield className="text-white" size={24} />
                        </div>
                        <h4 className="mb-0 fw-bold text-white tracking-tight d-none d-sm-block">
                            InsurAI <span className="text-primary">Global</span>
                        </h4>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} 
                            className="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-bold border-0 transition-hover">
                        <Plus size={20} /> <span className="d-none d-md-inline">New Policy</span>
                    </button>
                </div>
            </nav>

            <div className="container py-5">
                <header className="mb-5 text-center text-md-start">
                    <h2 className="fw-bold display-6 text-dark">Available Policies</h2>
                    <p className="text-muted lead">Manage your enterprise-grade insurance portfolio via distributed MySQL.</p>
                </header>

                {/* --- POLICY GRID --- */}
                <div className="row g-4">
                    {policies.length > 0 ? (
                        policies.map((p) => (
                            <div key={p.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden position-relative card-hover">
                                    <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill small fw-bold">
                                            {p.category || "General"}
                                        </span>
                                        <button onClick={() => handleDelete(p.id)} className="btn btn-light btn-sm rounded-circle text-danger shadow-sm">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    
                                    <div className="card-body px-4 pb-4 d-flex flex-column">
                                        <h4 className="fw-bold text-dark mb-3 mt-2">{p.policyName}</h4>
                                        <p className="text-muted small flex-grow-1 mb-4" style={{ lineHeight: '1.6' }}>
                                            {p.coverage || "High-performance coverage designed for enterprise-level risk management and asset protection."}
                                        </p>
                                        
                                        <div className="mt-auto pt-4 border-top d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-muted x-small d-block text-uppercase fw-bold tracking-wider mb-1">Premium</span>
                                                <span className="h3 mb-0 fw-bold text-primary">${p.premium}</span>
                                            </div>
                                            <button className="btn btn-dark rounded-pill px-3 py-2 d-flex align-items-center gap-1 small fw-bold">
                                                Details <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* EMPTY STATE UI */
                        <div className="col-12 text-center py-5">
                            <div className="bg-white p-5 rounded-5 shadow-sm border border-dashed border-2">
                                <Shield size={60} className="text-muted opacity-25 mb-3" />
                                <h4 className="fw-bold">No Records in MySQL</h4>
                                <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                                    Your connection is active, but your policy table is currently empty.
                                </p>
                                <button onClick={() => setIsSidebarOpen(true)} className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
                                    <Plus size={18} className="me-1" /> Create First Policy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- RESPONSIVE SIDEBAR DRAWER --- */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
                    <div className="sidebar-drawer shadow-lg" onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
                            <h5 className="fw-bold mb-0">Create New Policy</h5>
                            <button className="btn btn-light rounded-circle p-2" onClick={() => setIsSidebarOpen(false)}>
                                <X size={20} className="text-muted" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-4">
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">POLICY IDENTIFIER</label>
                                <input type="text" className="form-control form-control-lg border-2" placeholder="e.g. Cyber Security Pro" required 
                                       onChange={e => setForm({...form, policyName: e.target.value})} />
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">RISK CATEGORY</label>
                                <select className="form-select form-select-lg border-2" onChange={e => setForm({...form, category: e.target.value})}>
                                    <option>Health</option><option>Life</option><option>Vehicle</option><option>Cyber</option><option>Commercial</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">ANNUAL PREMIUM ($)</label>
                                <input type="number" className="form-control form-control-lg border-2" placeholder="0.00" required 
                                       onChange={e => setForm({...form, premium: e.target.value})} />
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">COVERAGE SCOPE</label>
                                <textarea className="form-control border-2" rows="4" placeholder="Describe the policy benefits..."
                                          onChange={e => setForm({...form, coverage: e.target.value})}></textarea>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold rounded-pill py-3 shadow mt-3">
                                <Save size={20} className="me-2" /> Commit to Database
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- CUSTOM CSS STYLES --- */}
            <style>{`
                .card-hover { 
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease; 
                    cursor: default;
                }
                .card-hover:hover { 
                    transform: translateY(-10px); 
                    box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important; 
                }
                .transition-hover:hover {
                    transform: scale(1.05);
                    opacity: 0.9;
                }
                .sidebar-overlay { 
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); 
                    z-index: 2000; display: flex; justify-content: flex-end; 
                    animation: fadeIn 0.3s ease;
                }
                .sidebar-drawer { 
                    width: 100%; max-width: 480px; 
                    background: white; height: 100%; overflow-y: auto; 
                    animation: slideIn 0.4s ease;
                }
                @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </div>
    );
};

export default PolicyListing;