
import { Router } from 'express';
import { generateimage } from '../controllers/generateimage.js';

const router = Router();

router.route('/').post(generateimage);

export default router;