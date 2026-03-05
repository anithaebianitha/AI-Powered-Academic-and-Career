import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">AI Career Framework</Link>
        <div className="navbar-nav ms-auto d-flex flex-row gap-2">
          {user ? (
            <>
              <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              <Link className="nav-link text-white" to="/assessment">Assessment</Link>
              <Link className="nav-link text-white" to="/recommendations">Careers</Link>
              <Link className="nav-link text-white" to="/skill-gap">Skill Gap</Link>
              <Link className="nav-link text-white" to="/roadmap">Roadmap</Link>
              {user.role === 'admin' && <Link className="nav-link text-warning" to="/admin">Admin</Link>}
              <button type="button" onClick={handleLogout} className="btn btn-sm btn-light ms-2">Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link text-white" to="/login">Login</Link>
              <Link className="nav-link text-white" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
