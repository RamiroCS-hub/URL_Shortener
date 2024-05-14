'use strict';
import express, { json } from 'express';
const app = express();
import { connect } from 'mongoose';
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js';
import { UrlController } from './Controller/urlController.js';

/* MIDDLEWARES */
app.use(corsConfig());
app.use(json());
dotEnv.config();

/* RUTAS */
app.post('/shorturl', UrlController.createShortUrl);

app.get('/:id', UrlController.getOriginalUrl)

app.use((req, res) =>{
  res.status(404).send('Invalid request');
})

app.listen(process.env.PORT || 3000, async () => {
  await connect(process.env.MONGODB_URL);
  console.log(`Listening on URL: http://localhost:${process.env.PORT}`);
});
