import 'dotenv/config'

import postgres from 'postgres'

const sql = postgres({
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'postgres'
})



export { sql }
