import express from 'express';
const router = express.Router();
import { UrlController } from '../Controller/urlController.js';

<<<<<<< HEAD
apiRouter.get('/', getUserId, UrlController.getAllUrls)
=======
router.post('/shorturl', UrlController.createShortUrl);
>>>>>>> parent of e84b6ac (Delete and findAll url added)

router.get('/:id', UrlController.getOriginalUrl)

<<<<<<< HEAD
apiRouter.get('/:id', UrlController.getOriginalUrl)

apiRouter.delete('/:id', UrlController.deleteUrl)

apiRouter.patch('/:id', UrlController.patchUrl);

export default apiRouter;
=======
export default router;
>>>>>>> parent of e84b6ac (Delete and findAll url added)
