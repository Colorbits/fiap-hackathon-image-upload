import { Router } from 'express';
import { createVideoZip, getImagesByVideoUuid, getVideoZip, updateVideoZip } from '../controllers/videoZipController';

const router = Router();

router.post('/', createVideoZip);
router.get('/:videoUuid', getVideoZip);
router.put('/:videoUuid', updateVideoZip);
router.get('/:videoUuid/images', getImagesByVideoUuid);

export default router;