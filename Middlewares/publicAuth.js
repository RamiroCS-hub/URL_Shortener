import { getUserId } from './auth.js'

export const authPublicEndpoint = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) next();
  getUserId(req, res, next);
}