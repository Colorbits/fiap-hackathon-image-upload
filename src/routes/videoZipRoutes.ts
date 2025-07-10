import { Router } from 'express';
import { createVideoZip, getImagesByVideoUuid, getVideoZip, updateVideoZip, getZippedImagesByVideoUuid } from '../controllers/videoZipController';

const router = Router();

router.post('/', createVideoZip);
router.put('/:videoUuid', updateVideoZip);
router.get('/:videoUuid', getVideoZip);
router.get('/:videoUuid/images', getImagesByVideoUuid);
router.get('/:videoUuid/zip', getZippedImagesByVideoUuid);

export default router;