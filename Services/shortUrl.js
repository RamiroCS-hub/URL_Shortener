'use strict';
const express = require('express');
const app = express();
const urlModel = require('../Models/urls.js');
const crypto = require('node:crypto');


const shortUrl = async (url) => {
  try{
    let model = await urlModel.create({ url: url, shortId: crypto.randomBytes(2).toString('hex') });
  
    model.shortenUrl = process.env.URL + model.shortId;
    console.log(model);
    return model;
  }catch(e){
    return e
  }
}

const findUrl = async (id) => {
  try{
    let realUrl = await urlModel.findOne({ shortId: id }).exec();
    console.log(realUrl);
    return realUrl.url;
  }catch(e){
    return e;
  }
}

module.exports = {
  shortUrl,
  findUrl
};
