import { Router } from 'express'; import bcrypt from 'bcryptjs'; import { User } from '../models/index.js'; import { tokenFor } from '../utils/token.js'; import { protect } from '../middleware/auth.js';
const r=Router(); const response=(u)=>({token:tokenFor(u),user:{id:u._id,name:u.name,email:u.email,phone:u.phone,role:u.role,address:u.address}});
r.post('/register',(req,res)=>res.status(403).json({message:'Customer accounts are not available.'}));
r.post('/login',async(req,res,next)=>{try{const email=req.body.email?.trim().toLowerCase();const u=email?await User.findOne({email,role:'admin'}):null;if(!u||u.active===false||!await bcrypt.compare(req.body.password||'',u.password))return res.status(401).json({message:'Invalid administrator email or password.'});res.json(response(u));}catch(e){next(e)}});
r.get('/me',protect,(req,res)=>req.user.role==='admin'?res.json({user:req.user}):res.status(403).json({message:'Administrator access required.'})); r.post('/logout',(req,res)=>res.json({message:'Logged out'}));
export default r;
