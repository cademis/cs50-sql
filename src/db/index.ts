import { createClient } from '@libsql/client'


const db = createClient({
    url: "file:local.db "
})

export { db }