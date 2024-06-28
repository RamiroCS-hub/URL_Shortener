import { findUrl, validateData, createShortUrl, updateClicks } from '../Services/urlService.js';
import { findUser } from '../Services/authService.js'
import { DatabaseError } from '../Utils/errors.js';
//import { deleteCache } from '../Utils/redis.js';

export class UrlController {

  static async createShortUrl(req, res){
    const isValid = validateData(req.body);
    if(!isValid.success) return res.status(400).send({ message: isValid });
    console.log(req.body.url);
    console.log(req.token);
    if(req.token != undefined){
      const userExist = await findUser(req.userId);
      if(userExist == '') return res.status(400).send('The user not have any links');
      console.log(userExist);
      req.id = userExist.id;
    }
    console.log(req.id);

    const shortU = await createShortUrl(req.body.url, req.id);
    if(shortU instanceof DatabaseError) return res.status(500).send({ message: shortU.message });
    
    return res.status(200).send({data: shortU});
  }

  static async getOriginalUrl (req, res) {
    const url = await findUrl(req.params.id);
    if(url == '') return res.status(404).json({  message: 'Error: Id not found'});
    if(url instanceof DatabaseError) return res.status(500).json({ message: url.message });
    
    await updateClicks(req.params.id, url.clicks);
    res.redirect(url.originalUrl);
  }

}