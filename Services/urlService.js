import { urlModel } from '../Schemas/urlSchema.js'
import crypto from 'node:crypto'
import z from 'zod'

export async function shortUrl (url) {
  try{
    let model = await urlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex') });
  
    model.shortenUrl = process.env.URL + model.shortId;
    return model;
  }catch(e){
    return ''
  }
}

export async function findUrl (id) {
  try{
    let realUrl = await urlModel.findOne({ shortId: id }).exec();
    return realUrl.url;
  }catch(e){
    return e;
  }
}

const patchSchema = z.object({
  originalUrl: z.string().url(),
})

export const validatePatchData = (object) => {
  return patchSchema.safeParse(object);
}

const postSchema = z.object({
  url: z.string().url({
    invalid_type_error: 'Url must be valid'
  })
});

export function validateData (object) {
  return postSchema.safeParse(object);
}