import express, { Request } from 'express'
import { pool } from './db'
import e from 'express'

interface User {
    email:string
}

const app = express()
app.use(express.json())

app.get("/", async (req,res)=> {
    try {
       const {rows} = await pool.query('select email from users')
       res.status(500).send(rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(200)
    }
})

app.post("/", async (req, res) => {
    try {
        const {email} = req.body as User

        await pool.query("insert into users(email) values($1)",[email])
        res.status(200).send({message:"succesfully inserted new row"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
})

app.get("/init", async (req,res)=> {
    try {
        await pool.query('create table if not exists users(email text)')
        res.status(200).send({message:"success"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.listen(3000, () => console.log("listening on http://localhost:3000"))