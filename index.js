'use strict';
import express, { json } from 'express';
const app = express();
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js';
import router from './Routes/api.js';
import mongoose from 'mongoose';

/* MIDDLEWARES */
app.use(corsConfig());
app.use(json());
dotEnv.config();

/* RUTAS */
app.use('/api', router);

app.use((req, res) =>{
  res.status(404).send('Invalid request');
})

app.listen(process.env.PORT || 3000, async () => {
  mongoose.connect(process.env.MONGODB_URL)
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log("Conecction open");
  });
  console.log(`Listening on URL: http://localhost:${process.env.PORT}`);
});
