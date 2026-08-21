import { Router } from 'express';
import { Inquiry, Product } from '../models/index.js';

const router = Router();
router.post('/', async (req, res, next) => {
  try {
    const { product, name, email, mobile, company, website, material, requirement } = req.body;
    const quantity = Number(req.body.quantity || 1);
    if (!product || !name?.trim() || !email?.trim() || !mobile?.trim()) return res.status(400).json({ message: 'Name, email and mobile number are required.' });
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return res.status(400).json({ message: 'Please enter a valid email address.' });
    if (!/^[0-9+()\-\s]{7,18}$/.test(mobile.trim())) return res.status(400).json({ message: 'Please enter a valid mobile number.' });
    if (!Number.isFinite(quantity) || quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1.' });
    if (!await Product.exists({ _id: product, active: true })) return res.status(404).json({ message: 'Product not found.' });
    const inquiry = await Inquiry.create({ product, name: name.trim(), email: email.trim(), mobile: mobile.trim(), company: company?.trim(), website: website?.trim(), quantity, material: material?.trim(), requirement: requirement?.trim() });
    res.status(201).json({ message: 'Thank you. Our team will contact you shortly.', inquiryId: inquiry._id });
  } catch (error) { next(error); }
});
export default router;
