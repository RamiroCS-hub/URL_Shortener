'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { shortUrl, findUrl } = require('./Services/shortUrl');
require('dotenv').config();


app.use(express.json())

app.post('/shorturl', async (req, res) => {
  let { url } = req.body;
  let shortU = await shortUrl(url);
  if(url != shortU.url) res.status(500).json({ message: 'Error; `${shortU}`' });
  
  res.status(200).json({message: `${shortU}`});
});

app.get('/:id', async (req, res) => {
  let url = await findUrl(req.params.id);
  res.redirect(url);
})

app.listen(process.env.PORT || 3000, async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Listening on port', process.env.PORT);
});
