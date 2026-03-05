const Career = require('../models/Career');

const getCareers = async (req, res) => {
  const careers = await Career.find().sort({ career_name: 1 });
  res.json(careers);
};

module.exports = { getCareers };
