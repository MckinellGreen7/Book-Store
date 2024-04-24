import express from 'express'
import { Book } from '../models/book.models.js'
const router = express.Router()

router.post('/', async(req,res)=>{
    try{
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: "Required Fields not given"})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        return res.status(200).send(book)
    } catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get("/", async(req,res)=>{
    try{
        const books = await Book.find()
        res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err){
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
    
})

router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.put("/:id", async(req,res)=>{
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: "Required Fields not given"})
        }

        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body)

        if (!result){
            return res.status(404).json({message: "Book not found"})
        }

        return res.status(200).json({message: "Book Updated Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.delete("/:id",async (req,res)=>{
    try {
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id,req.body)

        if (!result){
            return res.status(404).json({message: "Book not found"})
        }

        return res.status(200).json({message: "Book Deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

export default router;
