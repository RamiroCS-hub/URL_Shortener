'use strict';
import express, { json } from 'express';
const app = express();
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js';
import { apiRouter, authRouter } from './Routes/index.js';
import { auth } from 'express-oauth2-jwt-bearer';
import sequelize from './Config/db.js';

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
app.use('/api', apiRouter);

app.use('/auth', jwtCheck, authRouter)

app.use((req, res) =>{
  res.status(404).send('Invalid request');
})

sequelize.sync().then(() => {
  console.log('Database synced succesfully');
})

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Listening on URL: ${process.env.URL}`);
});
