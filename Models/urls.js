import mongoose from 'mongoose';
const { Schema } = mongoose;

const urlSchema = new Schema({ 
  url: String,
  shortenUrl: String,
  shortId: String
})

export const urlModel = mongoose.model('urlSchema', urlSchema);