const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({ 
  url: String,
  shortenUrl: String,
  shortId: String
})

module.exports = mongoose.model('urlSchema', urlSchema);