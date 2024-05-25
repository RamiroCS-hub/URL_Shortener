import { findAllUrl, deleteUrlById, validatePatchData, findUser } from '../Services/authService.js';
import { DatabaseError } from '../Utils/errors.js';


export class AuthController {
  static async getAllUrls(req, res){
    const userExist = await findUser(req.userId);
    if(userExist == '') return res.status(200).send('The user not have any links');
    
    const url = await findAllUrl(userExist.id)
    if(url instanceof DatabaseError) return res.status(500).json({ message:url.message });
    return res.status(200).json({data: url})
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
