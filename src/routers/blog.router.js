import express from 'express';
import * as blogCtrl from '../controllers/blog.controller';

const router = new express.Router();
router.use('/post', blogCtrl.writeBlog);
router.use('/get-blogs', blogCtrl.getBlogs);

export default router;
