/* eslint-disable node/prefer-global/process */
import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

import { migrate } from 'drizzle-orm/neon-http/migrator'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('Database url is not set in .env.local')
}

async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const db = drizzle(sql)

    await migrate(db, { migrationsFolder: './drizzle' })
    console.warn('All migrations are successfully done')
  }
  catch {
    console.error('Migration failed')
    // exit with error code 1
    process.exit(1)
  }
}

runMigration()
