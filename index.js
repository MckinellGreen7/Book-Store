import express from 'express'
import mongoose from 'mongoose'
import bookRoute from './routes/book.routes.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(express.json())
// app.use(cors())
app.use(cors({
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
}))



app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.use('/books', bookRoute)


mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('App connected to database')
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening on Port: ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})

