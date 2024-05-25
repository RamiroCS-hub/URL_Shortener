import { urlModel } from '../Schemas/urlSchema.js'
import crypto from 'node:crypto'
import z from 'zod'

<<<<<<< HEAD

export const patchUrlById = async (originalUrl, id) => {
  try {
    const patchedUrl = await UrlModel.update({originalUrl: originalUrl }, {where: {shortId: id }});
    return patchedUrl;
  } catch (e) {
    return new DatabaseError('Error updating the url');
  }
}

export const deleteUrlById = async (id) => {
  try {
    const deletedUrl = await UrlModel.destroy({where: {shortId: id}});
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
    return new DatabaseError('Could not find any Url');
  }
}

export async function createShortUrl (url, id) {
=======
export async function shortUrl (url) {
>>>>>>> parent of e84b6ac (Delete and findAll url added)
  try{
    let model = await urlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex') });
  
    model.shortenUrl = process.env.URL + model.shortId;
    return model;
  }catch(e){
<<<<<<< HEAD
    return new DatabaseError('Couldn"t create the short url');
=======
    return ''
>>>>>>> parent of e84b6ac (Delete and findAll url added)
  }
}

export async function findUrl (id) {
  try{
    let realUrl = await urlModel.findOne({ shortId: id }).exec();
    return realUrl.url;
  }catch(e){
<<<<<<< HEAD
    return new DatabaseError('Couldn"t find the url');
=======
    return e;
>>>>>>> parent of e84b6ac (Delete and findAll url added)
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