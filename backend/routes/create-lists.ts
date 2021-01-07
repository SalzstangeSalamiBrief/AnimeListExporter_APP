import { Router } from 'express';
import Controller from '../controller/create-lists';

const router = Router({ mergeParams: true });

router.route('/').post(Controller);

export default router;
