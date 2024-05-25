import { UrlModel } from '../Models/index.js'
import crypto from 'node:crypto'
import z from 'zod'
import { DatabaseError } from '../Utils/errors.js';


export async function createShortUrl (url, id) {
  try{
    let model = await UrlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex'), userId: id });
  
    model.shortenUrl = process.env.URL + model.shortId;
    return model;
  }catch(e){
    console.log(e);
    return new DatabaseError('Couldn"t create the short url');
  }
}

export async function findUrl (id) {
  try{
    const realUrl = await UrlModel.findOne({ shortId: id }).exec();
    return realUrl.url;
  }catch(e){
    return new DatabaseError('Couldn"t find the url');
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