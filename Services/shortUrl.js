'use strict';
const express = require('express');
const app = express();
const urlModel = require('../Models/urls.js');
const crypto = require('node:crypto');
const z = require('zod');

const shortUrl = async (url) => {
  try{
    let model = await urlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex') });
  
    model.shortenUrl = process.env.URL + model.shortId;
    return model;
  }catch(e){
    return ''
  }
}

const findUrl = async (id) => {
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

function validatePost (object) {
  return postSchema.safeParse(object);
}

module.exports = {
  shortUrl,
  findUrl,
  validatePost

};
