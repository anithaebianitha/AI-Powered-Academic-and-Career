import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    department: '',
    yearOfStudy: 1
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="mb-3">Student Registration</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {['name', 'email', 'password', 'college', 'department'].map((field) => (
                <input
                  key={field}
                  className="form-control mb-3"
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required
                />
              ))}
              <input
                className="form-control mb-3"
                type="number"
                min="1"
                max="6"
                placeholder="Year of study"
                value={form.yearOfStudy}
                onChange={(e) => setForm({ ...form, yearOfStudy: Number(e.target.value) })}
                required
              />
              <button className="btn btn-success w-100">Register</button>
            </form>
            <p className="mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
