import { Router } from 'express';
import Controller from '../controller/download-lists';

const router = Router({ mergeParams: true });

router.route('/file/:fileName').get(Controller);

export default router;
