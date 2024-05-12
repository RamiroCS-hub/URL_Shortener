'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { shortUrl, findUrl } = require('./Services/shortUrl');

require('dotenv').config();

/* MIDDLEWARES */
app.use(cors({
  allowedHeaders: '*',
  allowedMethods: '*',
  origin: '*'
}));
app.use(express.json());

app.post('/shorturl', async (req, res) => {
  let { url } = req.body;
  let shortU = await shortUrl(url);
  if(url != shortU.url) res.status(400).json({ message: 'Error; `${shortU}`' });
  
  res.status(200).json(model);
});

app.get('/:id', async (req, res) => {
  let url = await findUrl(req.params.id);
  if(url == '') res.status(404).json({  message: 'Error: Id not found'});
  res.redirect(url);
})

app.use((req, res) =>{
  res.status(404).send('Invalid request');
})

app.listen(process.env.PORT || 3000, async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Listening on port', process.env.PORT);
});
