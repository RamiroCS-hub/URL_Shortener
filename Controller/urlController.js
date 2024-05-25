import { findUrl, validateData, createShortUrl } from '../Services/urlService.js';
import { findUser } from '../Services/authService.js'
import { DatabaseError } from '../Utils/errors.js';

export class UrlController {

  static async createShortUrl(req, res){
    const isValid = validateData(req.body);
    if(!isValid.success) return res.status(400).json({ message: isValid });
    console.log(req.userId)
    const userExist = await findUser(req.userId);
    if(userExist == '' || userExist instanceof DatabaseError) return res.status(400).send('The user not have any links');
    console.log(userExist)

    const shortU = await createShortUrl(req.body.url, userExist.id);
    if(shortU instanceof DatabaseError) return res.status(500).json({ message: shortU.message });
    
    res.status(200).json({data: shortU});
  }

  static async getOriginalUrl (req, res) {
    const url = await findUrl(req.params.id);
    if(url == '') return res.status(404).json({  message: 'Error: Id not found'});
    if(url instanceof DatabaseError) return res.status(500).json({ message: url.message });

    res.redirect(url);
  }

}