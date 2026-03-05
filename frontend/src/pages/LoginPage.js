import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="mb-3">Student Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input className="form-control mb-3" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="form-control mb-3" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <button className="btn btn-primary w-100">Login</button>
            </form>
            <p className="mt-3 mb-0">No account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
