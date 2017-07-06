import express from 'express';
import blogRouter from './blog.router';

const router = new express.Router();
router.use('/blog', blogRouter);

export default router;
