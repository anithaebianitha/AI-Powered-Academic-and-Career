import React, { useEffect, useState } from 'react';
import api from '../services/api';

const emptyCareer = {
  career_name: '',
  description: '',
  required_skills: '',
  recommended_courses: '',
  average_salary: '',
  growth_outlook: ''
};

const AdminPanelPage = () => {
  const [careers, setCareers] = useState([]);
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState(emptyCareer);

  const load = async () => {
    const [careerRes, reportRes] = await Promise.all([api.get('/careers'), api.get('/admin/reports')]);
    setCareers(careerRes.data);
    setReports(reportRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addCareer = async (e) => {
    e.preventDefault();
    await api.post('/career', {
      ...form,
      required_skills: form.required_skills.split(',').map((v) => v.trim()),
      recommended_courses: form.recommended_courses.split(',').map((v) => v.trim())
    });
    setForm(emptyCareer);
    load();
  };

  const removeCareer = async (id) => {
    await api.delete(`/career/${id}`);
    load();
  };

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <div className="card shadow"><div className="card-body">
          <h4>Add Career</h4>
          <form onSubmit={addCareer}>
            {Object.keys(form).map((key) => (
              <input
                key={key}
                className="form-control mb-2"
                placeholder={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
              />
            ))}
            <button className="btn btn-primary">Add Career</button>
          </form>
        </div></div>
      </div>
      <div className="col-lg-7">
        <div className="card shadow"><div className="card-body">
          <h4>Careers</h4>
          {careers.map((career) => (
            <div className="d-flex justify-content-between border rounded p-2 mt-2" key={career._id}>
              <div>{career.career_name}</div>
              <button className="btn btn-sm btn-danger" onClick={() => removeCareer(career._id)}>Delete</button>
            </div>
          ))}
        </div></div>
      </div>
      <div className="col-12">
        <div className="card shadow"><div className="card-body">
          <h4>Student Reports</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Assessment</th></tr></thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>{report.name}</td><td>{report.email}</td><td>{report.department}</td>
                    <td>{report.assessment ? 'Available' : 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div></div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
