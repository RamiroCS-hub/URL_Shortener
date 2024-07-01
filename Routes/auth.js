import express from 'express'
import { AuthController } from '../Controller/authController.js'
const authRouter = express.Router()

authRouter.get('/', AuthController.getAllUrls)

authRouter.delete('/:id', AuthController.deleteUrl)

authRouter.patch('/:id', AuthController.patchUrl)

export default authRouter
