import { config } from 'dotenv'

config()

export const env = {
  DATABASE_URL: String(process.env.DATABASE_URL) 
}
