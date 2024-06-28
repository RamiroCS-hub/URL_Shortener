import { UrlModel } from '../Models/index.js'
import crypto from 'node:crypto'
import z from 'zod'
import { DatabaseError } from '../Utils/errors.js'

export const updateClicks = (id, clicks) => {
  try {
    const newClicks = UrlModel.update({ clicks: (clicks + 1) },
      {
        where: { shortId: id }
      })
    return newClicks
  } catch (e) {
    return new DatabaseError('Error updating clicks')
  }
}

export async function createShortUrl (url, id = 0) {
  try {
    const model = await UrlModel.create({ originalUrl: url, shortId: crypto.randomBytes(2).toString('hex'), userId: id })

    model.shortenUrl = process.env.API_URL + model.shortId
    model.save()
    return model
  } catch (e) {
    console.log(e)
    return new DatabaseError('Couldn"t create the short url')
  }
}

export async function findUrl (id) {
  try {
    const realUrl = await UrlModel.findOne({ where: { shortId: id } })
    return realUrl.dataValues
  } catch (e) {
    console.log(e)
    return new DatabaseError('Couldn"t find the url')
  }
}

const postSchema = z.object({
  url: z.string().url({
    invalid_type_error: 'Url must be valid'
  })
})

export function validateData (object) {
  return postSchema.safeParse(object)
}
