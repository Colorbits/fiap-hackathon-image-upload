import { Router } from 'express';
import { createImage, getImage } from '../controllers/ImageController';

const router = Router();

router.get('/:id', getImage);
router.post('/:videoUuid', createImage);

export default router;