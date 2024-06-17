import express from 'express';
const router = express.Router();
import { UrlController } from '../Controller/urlController.js';
import { authPublicEndpoint } from '../Middlewares/publicAuth.js';

apiRouter.post('/shorturl', authPublicEndpoint, UrlController.createShortUrl);

apiRouter.get('/:id', UrlController.getOriginalUrl);

export default apiRouter;
