import express from 'express'
const app = express();
import { urlModel } from '../Models/urls.js'
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

const postSchema = z.object({
  url: z.string().url({
    invalid_type_error: 'Url must be valid'
  })
});

export function validatePost (object) {
  return postSchema.safeParse(object);
}