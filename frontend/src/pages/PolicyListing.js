import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Shield, Plus, X, Trash2, Save, Menu } from 'lucide-react';

const PolicyListing = () => {
    const [policies, setPolicies] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ policyName: '', category: 'Health', premium: '', coverage: '' });

    useEffect(() => { fetchPolicies(); }, []);

    const fetchPolicies = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/policies');
            setPolicies(res.data);
            setLoading(false);
        } catch (err) { toast.error("Connection Failed"); }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/policies/add', form);
            toast.success("Policy Saved");
            setIsSidebarOpen(false);
            fetchPolicies();
        } catch (err) { toast.error("Save Failed"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this policy?")) {
            try {
                await axios.delete(`http://localhost:8080/api/policies/${id}`);
                toast.success("Removed");
                fetchPolicies();
            } catch (err) { toast.error("Delete Failed"); }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="min-vh-100 bg-light">
            {/* RESPONSIVE NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-3 px-md-5 sticky-top">
                <div className="container-fluid d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <Shield className="text-primary" size={24} />
                        <h4 className="mb-0 fw-bold text-white d-none d-sm-block">InsurAI Portal</h4>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="btn btn-primary rounded-pill px-3 px-md-4 d-flex align-items-center gap-2 shadow-sm">
                        <Plus size={18} /> <span className="d-none d-md-inline">New Policy</span>
                    </button>
                </div>
            </nav>

            <div className="container py-4 py-md-5">
                <header className="mb-4 text-center text-md-start">
                    <h2 className="fw-bold">Available Policies</h2>
                    <p className="text-muted">Managed via InsurAI Cloud Database</p>
                </header>

                {/* RESPONSIVE GRID: 1 col on mobile, 2 on tablet, 3 on desktop */}
                <div className="row g-3 g-md-4">
                    {policies.length > 0 ? (
                        policies.map((p) => (
                            <div key={p.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden card-hover">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-soft-blue text-primary px-3 py-2 rounded-pill small fw-bold">
                                                {p.category}
                                            </span>
                                            <button onClick={() => handleDelete(p.id)} className="btn btn-link text-danger p-0 border-0">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <h5 className="fw-bold mb-2">{p.policyName}</h5>
                                        <p className="text-muted small flex-grow-1 mb-4">
                                            {p.coverage || "Standard enterprise protection plan."}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                                            <div className="h4 mb-0 fw-bold text-dark">${p.premium}</div>
                                            <button className="btn btn-dark btn-sm rounded-pill px-3">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No policies found in MySQL.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* RESPONSIVE SIDEBAR (DRAWER) */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
                    <div className="sidebar-drawer shadow-lg" onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                            <h5 className="fw-bold mb-0">Add Policy</h5>
                            <X className="cursor-pointer text-muted" onClick={() => setIsSidebarOpen(false)} />
                        </div>
                        <form onSubmit={handleSave} className="p-4">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-uppercase text-muted">Policy Name</label>
                                <input type="text" className="form-control form-control-lg border-2 shadow-none" required 
                                       onChange={e => setForm({...form, policyName: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-uppercase text-muted">Category</label>
                                <select className="form-select form-select-lg border-2" onChange={e => setForm({...form, category: e.target.value})}>
                                    <option>Health</option><option>Life</option><option>Vehicle</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-uppercase text-muted">Premium ($)</label>
                                <input type="number" className="form-control form-control-lg border-2" required 
                                       onChange={e => setForm({...form, premium: e.target.value})} />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-uppercase text-muted">Coverage</label>
                                <textarea className="form-control border-2" rows="4" 
                                          onChange={e => setForm({...form, coverage: e.target.value})}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold rounded-pill shadow">
                                <Save size={20} className="me-2" /> Save Policy
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                /* Grid responsiveness */
                .bg-soft-blue { background-color: #e7f1ff; }
                .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .card-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }

                /* Sidebar responsiveness */
                .sidebar-overlay { 
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); 
                    z-index: 2000; display: flex; justify-content: flex-end; 
                }
                .sidebar-drawer { 
                    width: 100%; /* Default to full width on mobile */
                    max-width: 450px; /* Limit on larger screens */
                    background: white; height: 100%; overflow-y: auto; 
                }
                .cursor-pointer { cursor: pointer; }

                /* Mobile tweaks */
                @media (max-width: 576px) {
                    .container { padding-left: 20px; padding-right: 20px; }
                    .sidebar-drawer { max-width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default PolicyListing;