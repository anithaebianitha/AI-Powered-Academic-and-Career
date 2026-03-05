import React, { useEffect, useState } from 'react';
import api from '../services/api';

const SkillGapPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/skill-gap').then((res) => setRows(res.data.skillGap || []));
  }, []);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h3>Skill Gap Analysis</h3>
        {rows.map((item) => (
          <div className="border rounded p-3 mt-3" key={item.career}>
            <h5>{item.career}</h5>
            <p><strong>Required Skills:</strong> {item.requiredSkills.join(', ')}</p>
            <p><strong>Missing Skills:</strong> {item.missingSkills.length ? item.missingSkills.join(', ') : 'None 🎉'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGapPage;
