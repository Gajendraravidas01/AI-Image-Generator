
import { Router } from 'express';
import { createnewpost, getallpost } from '../controllers/post.js';

const router = Router();

router.route('/').get(getallpost);
router.route('/').post(createnewpost);

export default router;