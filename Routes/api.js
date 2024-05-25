import express from 'express';
const router = express.Router();
import { UrlController } from '../Controller/urlController.js';

router.post('/shorturl', UrlController.createShortUrl);

router.get('/:id', UrlController.getOriginalUrl)

export default router;
