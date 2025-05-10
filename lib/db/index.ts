import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

// eslint-disable-next-line node/prefer-global/process
const sql = neon(process.env.DATABASE_URL!)
// connection via drizzle itself
export const db = drizzle(sql, { schema })
// raw sql queries without drizzle
export { sql }
