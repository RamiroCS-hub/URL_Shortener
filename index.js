'use strict';
import express, { json } from 'express';
const app = express();
import { connect } from 'mongoose';
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js';
import router from './Routes/api.js';

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
  await connect(process.env.MONGODB_URL);
  console.log(`Listening on URL: http://localhost:${process.env.PORT}`);
});
