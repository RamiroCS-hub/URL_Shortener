import { UrlModel, User } from '../Models/index.js'
import z from 'zod'
import { DatabaseError } from '../Utils/errors.js';


export const findUser = async (id) => {
  try {
    const user = await User.find({where: {authId: id}});
    if(!(user.length == '')) return user;
    await User.create({ authId: id})
    return ''
  } catch (e) {
    return new DatabaseError('Error finding the user');
  }
}

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

const patchSchema = z.object({
  originalUrl: z.string().url(),
})

export const validatePatchData = (object) => {
  return patchSchema.safeParse(object);
}