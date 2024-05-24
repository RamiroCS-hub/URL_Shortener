import express from 'express';
const apiRouter = express.Router();
import { UrlController } from '../Controller/urlController.js';
import { getUserId } from '../Middlewares/auth.js';

apiRouter.get('/', getUserId, UrlController.getAllUrls)

apiRouter.post('/shorturl', getUserId, UrlController.createShortUrl);

apiRouter.get('/:id', UrlController.getOriginalUrl)

apiRouter.delete('/:id', UrlController.deleteUrl)

apiRouter.patch('/:id', UrlController.patchUrl);

export default apiRouter;