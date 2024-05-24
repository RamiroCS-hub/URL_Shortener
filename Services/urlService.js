import { UrlModel } from '../Models/index.js'
import crypto from 'node:crypto'
import z from 'zod'
import { DatabaseError } from '../Utils/errors.js';


export const deleteUrlById = async(id) => {
  try {
    const deletedUrl = await UrlModel.destroy({where: {shortId: id}})
    return deletedUrl;
  } catch (e) {
    return new DatabaseError('Error deleting the url');
  }
}

export const findAllUrl = async (id) => {
  try {
    const allUrls = UrlModel.findAll({where: {userId: id}});
    return allUrls;
  } catch (e) {
    return new DatabaseError('Could not find any Url')
  }
}

export async function createShortUrl (url, id) {
  try{
    let model = await UrlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex'), userId: id });
  
    model.shortenUrl = process.env.URL + model.shortId;
    return model;
  }catch(e){
    return new DatabaseError('Couldn"t create the short url')
  }
}

export async function findUrl (id) {
  try{
    const realUrl = await UrlModel.findOne({ shortId: id }).exec();
    return realUrl.url;
  }catch(e){
    return new DatabaseError('Couldn"t find the url')
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