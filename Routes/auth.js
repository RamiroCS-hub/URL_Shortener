import express from 'express';
const authRouter = express.Router();
import { getUserId } from '../Middlewares/auth.js'
import { AuthController } from '../Controller/authController.js';

authRouter.get('/', getUserId, AuthController.getAllUrls)

authRouter.delete('/:id', AuthController.deleteUrl)

authRouter.patch('/:id', AuthController.patchUrl);

export default authRouter;