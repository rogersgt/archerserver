import express from 'express';
import * as authCtrl from '../controllers/auth.controller';

const router = new express.Router();
router.use('/', authCtrl.login);
export default router;