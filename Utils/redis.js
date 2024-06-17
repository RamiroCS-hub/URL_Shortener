import Redis from 'redis';
import dotenv from 'dotenv';
import { DatabaseError } from './errors.js';

dotenv.config()

export const checkCache = async (key, cb) => {
  const redisClient = await Redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT
    }
  }).connect()
    .catch( err => {
      console.error('Ocurrió un error de conexión: ' + err)
      return rej(err)
    })
  return new Promise( async (res, rej) => {
    const response = await redisClient.get(key)
      .catch( err => {
        console.log(err)
        rej(err)
      })
    if(response) {
      redisClient.quit()
      console.log('Response 27 is:', response)
      return res(JSON.parse(response))
    }
    const result = await cb()
    console.log('Result is:', result)  
    if(result instanceof DatabaseError) {
      redisClient.quit()
      return rej(result.message)
    }
    
    redisClient.set(key, JSON.stringify(result), {EX: process.env.REDIS_EXPIRATION})
    redisClient.quit()
    return res(result)
  })
}

export const updateCache = async (key) => {
  const redisClient = await Redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT
    }
  }).connect()
    .catch( err => {
      console.error('Ocurrió un error de conexión: ' + err)
      return rej(err)
    })
  return new Promise ( (res, rej) => {
    redisClient.del(key)
    .then(data => res(data))
    .catch(err => rej(err))
  })
}