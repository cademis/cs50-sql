import express, { Request } from 'express'
import { sql } from './db'

interface User {
    email: string
}

const app = express()
app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const xs = await sql`select email from users`
        res.status(500).send(xs)
    } catch (error) {
        console.log(error)
        res.sendStatus(200)
    }
})

app.post("/", async (req, res) => {
    try {
        const { email } = req.body as User

        await sql`insert into users(email) values(${email})`
        res.status(200).send({ message: "succesfully inserted new row" })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

app.get("/init", async (req, res) => {
    try {
        await sql`create table if not exists users(email text)`
        res.status(200).send({ message: "success" })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.get("/init-schools", async (req, res) => {
    try {
        await sql`create table if not exists schools(id serial primary key)`
        res.status(200).send({ message: "success" })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.listen(3000, () => console.log("listening on http://localhost:3000"))