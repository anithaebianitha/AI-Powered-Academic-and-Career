import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const profileRes = await api.get('/profile');
      setProfile(profileRes.data);

      try {
        const gapRes = await api.get('/skill-gap');
        const recRes = await api.get('/recommend-careers');
        setRecommendations(recRes.data.recommendations || []);
        if (gapRes.data.skillGap?.length) {
          setAssessment(gapRes.data.skillGap[0].yourSkills);
        }
      } catch (error) {
        setAssessment(null);
      }
    };

    loadData();
  }, []);

  const chartData = assessment
    ? {
        labels: Object.keys(assessment),
        datasets: [{ label: 'Skill Score', data: Object.values(assessment), backgroundColor: '#0d6efd' }]
      }
    : null;

  return (
    <div className="row g-4" id="dashboard-report">
      <div className="col-12">
        <div className="card shadow-sm"><div className="card-body">
          <h2>Welcome, {profile?.name || user?.name}</h2>
          <p className="mb-1">{profile?.college} - {profile?.department}</p>
          <p className="text-muted">Year {profile?.yearOfStudy}</p>
        </div></div>
      </div>
      <div className="col-lg-8">
        <div className="card shadow-sm"><div className="card-body">
          <h5>Skill Score Chart</h5>
          {chartData ? <Bar data={chartData} /> : <p>Complete assessment to visualize skills.</p>}
        </div></div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm"><div className="card-body">
          <h5>Top Recommended Careers</h5>
          <ul className="list-group">
            {recommendations.map((career) => (
              <li className="list-group-item d-flex justify-content-between" key={career.career_name}>
                <span>{career.career_name}</span>
                <span className="badge bg-success">{career.match_score}%</span>
              </li>
            ))}
          </ul>
        </div></div>
      </div>
    </div>
  );
};

export default DashboardPage;
