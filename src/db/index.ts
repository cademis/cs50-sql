import { createClient } from '@libsql/client'


const db = createClient({
    url: "file:sqlite.db "
})

export { db }