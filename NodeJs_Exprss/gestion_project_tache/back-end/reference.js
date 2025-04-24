// 📁 server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const { errorHandler } = require('./middlewares/error.middleware');

// Init dotenv
dotenv.config();

// Connect to DB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// 📁 middlewares/error.middleware.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
}
module.exports = { errorHandler };


// 📁 middlewares/role.middleware.js
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
}
module.exports = { authorizeRoles };


// 📁 validation/user.validation.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };


// 📁 middlewares/validate.middleware.js
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
module.exports = validate;


// 📁 routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validation/user.validation');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;


// 📁 routes/project.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { createProject, getProjects } = require('../controllers/project.controller');

router.post('/', protect, authorizeRoles('admin'), createProject);
router.get('/', protect, getProjects);

module.exports = router;


// 📁 routes/task.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { createTask, getTasksByProject } = require('../controllers/task.controller');

router.post('/:projectId', protect, createTask);
router.get('/:projectId', protect, getTasksByProject);

module.exports = router;


// 📁 models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


// 📁 models/project.model.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);


// 📁 models/task.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);


// 📁 controllers/auth.controller.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user) });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }
  res.json({ token: generateToken(user) });
};

module.exports = { register, login };


// 📁 controllers/project.controller.js
const Project = require('../models/project.model');

const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.id });
  res.json(projects);
};

module.exports = { createProject, getProjects };


// 📁 controllers/task.controller.js
const Task = require('../models/task.model');

const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, project: req.params.projectId });
  res.status(201).json(task);
};

const getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

module.exports = { createTask, getTasksByProject };
