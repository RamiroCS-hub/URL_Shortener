import express from 'express'
import { UrlController } from '../Controller/urlController.js'
import { authPublicEndpoint } from '../Middlewares/publicAuth.js'
const apiRouter = express.Router()

apiRouter.post('/shorturl', authPublicEndpoint, UrlController.createShortUrl)

export default apiRouter
