import React, { useEffect, useState } from 'react';
import api from '../services/api';

const LearningRoadmapPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    api.get('/roadmap').then((res) => setRoadmaps(res.data.roadmaps || []));
  }, []);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h3>Learning Roadmap</h3>
        {roadmaps.map((roadmap) => (
          <div key={roadmap._id} className="border rounded p-3 mt-3">
            <h5>{roadmap.missingSkill} Roadmap</h5>
            <ol>{roadmap.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p><strong>Online Courses:</strong> {roadmap.onlineCourses.join(', ')}</p>
            <p><strong>YouTube Resources:</strong> {roadmap.youtubeResources.join(', ')}</p>
            <p><strong>Project Ideas:</strong> {roadmap.projectIdeas.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmapPage;
