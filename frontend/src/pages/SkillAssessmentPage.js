import React, { useState } from 'react';
import api from '../services/api';

const fields = [
  { key: 'programming', label: 'Programming' },
  { key: 'webDevelopment', label: 'Web Development' },
  { key: 'dataStructures', label: 'Data Structures' },
  { key: 'database', label: 'Database' },
  { key: 'communication', label: 'Communication' },
  { key: 'problemSolving', label: 'Problem Solving' },
  { key: 'aiMlBasics', label: 'AI / ML basics' }
];

const SkillAssessmentPage = () => {
  const [skills, setSkills] = useState(fields.reduce((acc, field) => ({ ...acc, [field.key]: 1 }), {}));
  const [message, setMessage] = useState('');

  const submitAssessment = async (e) => {
    e.preventDefault();
    await api.post('/skill-assessment', skills);
    setMessage('Assessment saved successfully!');
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h3>Skill Assessment (1 to 5)</h3>
        <p className="text-muted">1-Beginner, 2-Basic, 3-Intermediate, 4-Advanced, 5-Expert</p>
        <form onSubmit={submitAssessment}>
          {fields.map((field) => (
            <div className="mb-3" key={field.key}>
              <label className="form-label">{field.label}</label>
              <select
                className="form-select"
                value={skills[field.key]}
                onChange={(e) => setSkills({ ...skills, [field.key]: Number(e.target.value) })}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
          ))}
          <button className="btn btn-primary">Save Assessment</button>
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default SkillAssessmentPage;
