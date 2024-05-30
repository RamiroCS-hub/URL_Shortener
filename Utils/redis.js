import Redis from 'redis';
import dotenv from 'dotenv';
import { DatabaseError } from './utils.js';

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
    if(response != null || response != undefined) {
      redisClient.quit()
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