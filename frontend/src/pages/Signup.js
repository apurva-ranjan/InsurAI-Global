import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Creating Secure Account...");

    try {
      const response = await axios.post(
        'https://insurai-global-production.up.railway.app/api/auth/register', 
        formData,
        {
          // ADDITION 1: Explicitly allow credentials for CORS handshake
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // ADDITION 2: Support both string status and boolean success flags
      if (response.data.status === "success" || response.status === 200 || response.status === 201) {
        toast.success("Account Created! You can now login.", { id: loadToast });
        navigate('/login');
      }
    } catch (error) {
      console.error("Signup Error Details:", error.response || error);
      
      // ADDITION 3: Better error message handling
      let errorMsg = "Registration failed. Check backend connection.";
      if (error.response) {
        errorMsg = typeof error.response.data === 'string' 
          ? error.response.data 
          : (error.response.data.message || "Invalid Data");
      } else if (error.request) {
        errorMsg = "No response from server. Is the backend awake?";
      }

      toast.error(errorMsg, { id: loadToast });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" 
         style={{ 
           backgroundImage: 'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80")', 
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      
      <div className="card shadow-lg p-4" style={{ width: '450px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
        <div className="text-center mb-4">
          <Shield size={40} className="text-primary mb-2" />
          <h2 className="fw-bold">Join InsurAI</h2>
          <p className="text-muted small">Create your enterprise account</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><User size={18} /></span>
              <input name="name" type="text" className="form-control" placeholder="John Doe" required onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><Mail size={18} /></span>
              <input name="email" type="email" className="form-control" placeholder="admin@insurai.com" required onChange={handleChange} />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><Lock size={18} /></span>
              <input name="password" type="password" className="form-control" placeholder="••••••••" required onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center mt-3 small">
          Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;