import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../services/api';

const CareerRecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    api.get('/recommend-careers').then((res) => setRecommendations(res.data.recommendations || []));
  }, []);

  const downloadPDF = async () => {
    const element = document.getElementById('career-report');
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = 190;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imageData, 'PNG', 10, 10, width, height);
    pdf.save('career-recommendation-report.pdf');
  };

  return (
    <div id="career-report" className="card shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h3>Top 3 Career Recommendations</h3>
          <button className="btn btn-outline-primary" onClick={downloadPDF}>Download PDF</button>
        </div>
        {recommendations.map((career) => (
          <div key={career.career_name} className="border rounded p-3 mt-3">
            <h5>{career.career_name} <span className="badge bg-success">{career.match_score}% match</span></h5>
            <p>{career.description}</p>
            <p><strong>Average Salary:</strong> {career.average_salary} | <strong>Growth:</strong> {career.growth_outlook}</p>
            <p><strong>Required skills:</strong> {career.required_skills.join(', ')}</p>
            <p><strong>Recommended courses:</strong> {career.recommended_courses.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendationPage;
