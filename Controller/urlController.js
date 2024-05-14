import { shortUrl, findUrl, validateData } from '../Services/urlService.js';

export class UrlController {

  static async createShortUrl(req, res){

    const result = validateData(req.body);
  
    if(result.error) return res.status(400).json({ message: result.error.message });
  
    const shortU = await shortUrl(result.data.url);
    
    res.status(200).json(shortU);
  }

  static async getOriginalUrl (req, res) {
    const url = await findUrl(req.params.id);
    if(url == '') res.status(404).json({  message: 'Error: Id not found'});
    res.redirect(url);
  }
}