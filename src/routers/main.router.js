import express from 'express';
import blogRouter from './blog.router';
import authRouter from './auth.router';

const router = new express.Router();
router.use('/blog', blogRouter);
router.use('/login', authRouter);

export default router;
