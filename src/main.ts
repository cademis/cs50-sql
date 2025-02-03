import express from 'express'
import { db } from './db'


const app = express()
app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const { rows } = await db.execute(`select * from users`)
        res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)

    }
})

app.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        await db.execute({ sql: `insert into users(email) values(?)`, args: [email] })
    } catch (err) {

    }
}
)

app.get("/init", async (req, res) => {
    try {
        await db.execute(`create table if not exists users (email text)`)
        res.send(200).send({ message: "succesffullt created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)

    }
})

app.listen(3000, () => console.log("listening on http://localhost:3000"))