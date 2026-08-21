import jwt from 'jsonwebtoken'; import { User } from '../models/index.js';
export const protect = async (req,res,next) => { try { const token=req.headers.authorization?.split(' ')[1]; if(!token) throw Error(); req.user=await User.findById(jwt.verify(token,process.env.JWT_SECRET).id).select('-password'); if(!req.user||req.user.active===false) throw Error(); next(); } catch { res.status(401); next(new Error('Please sign in to continue.')); } };
export const admin = (req,res,next) => req.user?.role === 'admin' ? next() : res.status(403) && next(new Error('Admin access required.'));
