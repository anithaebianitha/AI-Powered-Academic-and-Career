const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tokenFor = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d'
  });

const register = async (req, res) => {
  try {
    const { name, email, password, college, department, yearOfStudy } = req.body;

    if (!name || !email || !password || !college || !department || !yearOfStudy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      department,
      yearOfStudy
    });

    return res.status(201).json({
      token: tokenFor(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        department: user.department,
        yearOfStudy: user.yearOfStudy,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      token: tokenFor(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        department: user.department,
        yearOfStudy: user.yearOfStudy,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to login' });
  }
};

module.exports = { register, login };
