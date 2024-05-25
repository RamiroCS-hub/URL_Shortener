<<<<<<< HEAD
import { findUrl, validateData, createShortUrl, findAllUrl, deleteUrlById, validatePatchData } from '../Services/urlService.js';
import { DatabaseError } from '../Utils/errors.js';
=======
import { shortUrl, findUrl, validateData } from '../Services/urlService.js';
>>>>>>> parent of e84b6ac (Delete and findAll url added)

export class UrlController {

  static async createShortUrl(req, res){
<<<<<<< HEAD
    const isValid = validateData(req.body);
    
    if(!isValid.success) return res.status(400).json({ message: result.error.message });
=======

    const result = validateData(req.body);
>>>>>>> parent of e84b6ac (Delete and findAll url added)
  
    if(result.error) return res.status(400).json({ message: result.error.message });
  
    const shortU = await shortUrl(result.data.url);
    
    res.status(200).json(shortU);
  }

  static async getOriginalUrl (req, res) {
    const url = await findUrl(req.params.id);
<<<<<<< HEAD
    if(url == '') return res.status(404).json({  message: 'Error: Id not found'});
    if(url instanceof DatabaseError) return res.status(500).json({ message: url.message });

    res.redirect(url);
  }

  static async getAllUrls(req, res){
    const url = await findAllUrl(req.userId)
    if(url instanceof DatabaseError) return res.status(500).json({ message:url.message });
    return res.status(200).json({data: url})
  }

  static async deleteUrl(req, res){
    const deletedUrl = await deleteUrlById(req.params.id)
    if(deletedUrl instanceof DatabaseError) return res.status(500).json({ message:url.message });

    return res.status(200).json({ data: deletedUrl});
  }

  static async patchUrl(req, res){
    const isValid = validatePatchData(req.body)

    if(isValid.success) return res.status(401).json({ message: isValid.message });

    const patchedUrl = await patchUrlById(req.body.originalUrl, req.params.id);
    if(patchedUrl instanceof DatabaseError) return res.status(400).json({ message: patchedUrl });

    return res.status(200).json({ message: patchedUrl });
  }

=======
    if(url == '') res.status(404).json({  message: 'Error: Id not found'});
    res.redirect(url);
  }
>>>>>>> parent of e84b6ac (Delete and findAll url added)
}