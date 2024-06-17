import { urlModel } from '../Schemas/urlSchema.js'
import crypto from 'node:crypto'
import z from 'zod'


export const updateClicks = (id, clicks) => {
  try {
    const newClicks = UrlModel.update({clicks: (clicks+1)},
      {
      where:{shortId: id},
    })
    return newClicks
  } catch (e) {
    return new DatabaseError('Error updating clicks')
  }
}

export async function createShortUrl (url, id = 0) {
  try{
    let model = await UrlModel.create({ originalUrl: url, shortId: crypto.randomBytes(2).toString('hex'), userId: id })
  
    model.shortenUrl = process.env.API_URL + model.shortId
    model.save()
    return model
  }catch(e){
<<<<<<< HEAD
    return ''
=======
    console.log(e)
    return new DatabaseError('Couldn"t create the short url')
>>>>>>> dev
  }
}

export async function findUrl (id) {
  try{
<<<<<<< HEAD
    let realUrl = await urlModel.findOne({ shortId: id }).exec();
    return realUrl.url;
  }catch(e){
    return e;
=======
    const realUrl = await UrlModel.findOne({ where: { shortId: id } });
    return realUrl.dataValues;
  }catch(e){
    console.log(e)
    return new DatabaseError('Couldn"t find the url');
>>>>>>> dev
  }
}

const postSchema = z.object({
  url: z.string().url({
    invalid_type_error: 'Url must be valid'
  })
});

export function validateData (object) {
  return postSchema.safeParse(object);
}