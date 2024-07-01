'use strict'
import express, { json } from 'express'
import dotEnv from 'dotenv'
import { corsConfig } from './Middlewares/cors.js'
import { apiRouter, authRouter } from './Routes/index.js'
import { auth } from 'express-oauth2-jwt-bearer'
import sequelize from './Config/db.js'
import { UrlController } from './Controller/urlController.js'
import { getUserId } from './Middlewares/auth.js'
const app = express()

/* MIDDLEWARES */
app.use(corsConfig())
app.use(json())
dotEnv.config()

const jwtCheck = auth({
  audience: 'htpps://RS-256-api',
  issuerBaseURL: 'https://dev-fyc850ikobc57pdt.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})

/* RUTAS */
app.use('/api', apiRouter)

app.use('/auth', jwtCheck, getUserId, authRouter)

app.get('/:id', UrlController.getOriginalUrl)

app.use((req, res) => {
  res.status(404).send('Invalid request')
})

sequelize.sync().then(() => {
  console.log('Database synced succesfully')
})

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Listening on URL: ${process.env.URL}`)
})
