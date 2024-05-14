import cors from 'cors'

export const corsConfig = () => cors({
  allowedHeaders: '*',
  allowedMethods: '*',
  origin: '*'
})