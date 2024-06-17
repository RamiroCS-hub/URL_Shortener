'use strict';
import express, { json } from 'express';
const app = express();
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js';
<<<<<<< HEAD
import router from './Routes/api.js';
import mongoose from 'mongoose';
=======
import { apiRouter, authRouter } from './Routes/index.js';
import { auth } from 'express-oauth2-jwt-bearer';
import sequelize from './Config/db.js';
>>>>>>> dev

/* MIDDLEWARES */
app.use(corsConfig());
app.use(json());
dotEnv.config();

const jwtCheck = auth({
  audience: 'htpps://RS-256-api',
  issuerBaseURL: 'https://dev-fyc850ikobc57pdt.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

/* RUTAS */
app.use('/api', router);

app.use('/auth', jwtCheck, authRouter)

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
