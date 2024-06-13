import { findAllUrl, deleteUrlById, validatePatchData, findUser, patchUrlById } from '../Services/authService.js';
import { DatabaseError } from '../Utils/errors.js';
import { checkCache } from '../Utils/redis.js';


export class AuthController {
  static async getAllUrls(req, res){

    const userCacheCheck = await checkCache(`user:${req.userId}`, async () => {
      const userExist = await findUser(req.userId);
      return userExist
    }).catch(err => {
      return res.status(500).json({ message: 'Error getting the user from the cache', err: err})
    })
    console.log('Cache user is:', userCacheCheck)
    const urlCacheCheck = await checkCache(`urls:${userCacheCheck.id}`, async () => {
      console.log('Cache user is:',userCacheCheck)
      const url = await findAllUrl(userCacheCheck.id)
      return url
    }).catch(err => {
      return res.status(500).json({ message: 'Error getting the url from the cache', err: err})
    })
    if(!urlCacheCheck) return res.status(200).json({message: 'User dont have any link'})
    return res.status(200).json({data: urlCacheCheck})
  }
  
  static async deleteUrl(req, res){
    const deletedUrl = await deleteUrlById(req.params.id)
    if(deletedUrl instanceof DatabaseError) return res.status(500).json({ message:url.message });
  
    return res.status(200).json({ data: deletedUrl });
  }
  
  static async patchUrl(req, res){
    const isValid = validatePatchData(req.body)
  
    if(isValid.success) return res.status(401).json({ message: isValid.message });
  
    const patchedUrl = await patchUrlById(req.body.originalUrl, req.params.id);
    if(patchedUrl instanceof DatabaseError) return res.status(400).json({ message: patchedUrl });
  
    return res.status(200).json({ message: patchedUrl });
  }
}
