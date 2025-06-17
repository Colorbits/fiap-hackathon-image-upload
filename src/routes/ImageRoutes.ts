import { Router } from 'express';
import { createImage, getImage } from '../controllers/imageController';

const router = Router();

router.get('/:id', getImage);
router.post('/:videoUuid', createImage);

export default router;