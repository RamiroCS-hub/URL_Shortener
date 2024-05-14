'use strict';
import express, { json } from 'express';
const app = express();
import { connect } from 'mongoose';
import cors from 'cors';
import { shortUrl, findUrl, validatePost } from './Services/shortUrl.js';

import dotEnv from 'dotenv'

/* MIDDLEWARES */
app.use(cors({
  allowedHeaders: '*',
  allowedMethods: '*',
  origin: '*'
}));
app.use(json());
dotEnv.config();

/* RUTAS */
app.post('/shorturl', async (req, res) => {

  const result = validatePost(req.body);

  if(result.error) return res.status(400).json({ message: result.error.message });

  const shortU = await shortUrl(result.data.url);
  
  res.status(200).json(shortU);
});

app.get('/:id', async (req, res) => {
  const url = await findUrl(req.params.id);
  if(url == '') res.status(404).json({  message: 'Error: Id not found'});
  res.redirect(url);
})

app.use((req, res) =>{
  res.status(404).send('Invalid request');
})

app.listen(process.env.PORT || 3000, async () => {
  await connect(process.env.MONGODB_URL);
  console.log(`Listening on URL: http://localhost:${process.env.PORT}`);
});
