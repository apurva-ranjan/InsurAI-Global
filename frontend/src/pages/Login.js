import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Verifying Identity...");

    try {
      const response = await axios.post('insurai-global-production.up.railway.app/api/auth/login', {
        email: email,
        password: password
      });

      if (response.data.status === "success") {
        // --- DATA SYNC MODIFICATION ---
        localStorage.setItem('isAuthenticated', 'true');
        // Stores the actual user object from MySQL
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
        localStorage.setItem('sessionToken', response.data.token || 'secure-session-789');
        
        toast.success("Identity Verified. Access Granted.", { id: loadToast });
        navigate('/');
      }
    } catch (error) {
      console.error("Login Error:", error);
      const msg = error.response?.status === 401 ? "Invalid Email or Password" : "Server Connection Failed";
      toast.error(msg, { id: loadToast });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" 
         style={{ 
           backgroundImage: 'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")', 
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           position: 'relative'
         }}>
      
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }}></div>

      <div className="card border-0 shadow-lg p-4 p-md-5" 
           style={{ 
             width: '480px', 
             borderRadius: '28px', 
             zIndex: 2,
             backgroundColor: 'rgba(255, 255, 255, 0.85)',
             backdropFilter: 'blur(15px)',
             boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
           }}>
        
        <div className="text-center mb-4">
          <div className="bg-primary p-3 rounded-4 d-inline-block mb-3 shadow">
            <Shield size={38} className="text-white" />
          </div>
          <h1 className="fw-bold text-dark h3">InsurAI <span className="text-primary">Global</span></h1>
          <p className="text-muted small fw-medium">Securing Futures with Artificial Intelligence</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Enterprise Email</label>
            <div className="input-group mb-2">
              <span className="input-group-text bg-white border-end-0 rounded-start-3">
                <Mail size={18} className="text-primary" />
              </span>
              <input 
                type="email" 
                className="form-control border-start-0 rounded-end-3 py-2" 
                placeholder="admin@insurai.com" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-dark">Secure Password</label>
            <div className="input-group mb-2">
              <span className="input-group-text bg-white border-end-0 rounded-start-3">
                <Lock size={18} className="text-primary" />
              </span>
              <input 
                type="password" 
                className="form-control border-start-0 rounded-end-3 py-2" 
                placeholder="••••••••" 
                required 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2" 
                  style={{ borderRadius: '15px' }}>
            Authorize Session <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center mt-4 text-muted small">
          New to the portal? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Create an Account</Link>
        </div>

        <div className="mt-5 pt-3 border-top text-center">
          <div className="d-flex justify-content-center gap-3">
            <div className="d-flex align-items-center gap-1 small text-muted">
              <CheckCircle size={14} className="text-success" /> Biometric Ready
            </div>
            <div className="d-flex align-items-center gap-1 small text-muted">
              <CheckCircle size={14} className="text-success" /> 256-bit AES
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;