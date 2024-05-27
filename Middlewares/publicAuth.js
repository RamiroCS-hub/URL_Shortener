import { getUserId } from './auth.js'

export const authPublicEndpoint = (req, res, next) => {
  const token = req.headers['authorization'];
  if(token) {
    console.log('Se dio un token')
    getUserId(req, res, next);
  }
  req.token = undefined;
  req.id = 0;
  next();
}