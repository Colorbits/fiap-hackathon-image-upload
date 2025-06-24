import { Router } from 'express';
import { createImage, getImage } from '../controllers/imageController';

const router = Router();

router.post('/:videoUuid', createImage);
router.get('/:imageUuid', getImage);

export default router;