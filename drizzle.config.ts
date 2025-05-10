/* eslint-disable node/prefer-global/process */
import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('Database url is not set in .env.local')
}

export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    // when it is going to make migration it will keep all the files with that name
    table: '__drizzle_migration',
    schema: 'public',
  },
  // it will show all the things that it is doing behind the scenes
  verbose: true,
  // it just ask you once again whether you really want to perform action
  strict: true,

})
