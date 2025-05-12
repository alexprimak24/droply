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
  console.warn('🔄 Starting database migration...')

  try {
    // Create a Neon SQL connection
    const sql = neon(process.env.DATABASE_URL!)

    // Initialize Drizzle with the connection
    const db = drizzle(sql)

    // Run migrations from the drizzle folder
    console.warn('📂 Running migrations from ./drizzle folder')
    await migrate(db, { migrationsFolder: './drizzle' })

    console.warn('✅ Database migration completed successfully!')
  }
  catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
