import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '../models/user.model.js';


const generateToken = (user) => {
  return jwt.sign(
    { 
        id: user._id, 
        role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' });
};


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user) });
};


const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await  User.findOne({email});
    if(!user || await user.matchPassword((password))) return res.status(401).json({message : 'Incorrect email or password'});
    res.json({ token: generateToken(user) });
}

export { register, login }