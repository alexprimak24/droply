/* eslint-disable node/prefer-global/process */
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

if(!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL in environment")
}

const sql = neon(process.env.DATABASE_URL!)
// connection via drizzle itself
export const db = drizzle(sql, { schema })
// raw sql queries without drizzle
export { sql }
