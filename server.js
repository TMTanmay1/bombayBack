import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connect from './database/db.js';
import multer from 'multer';

const port = 8080;
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})
const User = new mongoose.model("User" , userSchema)


app.post("/login" , (req,res)=>{
    const {email , password } = req.body
    console.log(email);
    User.findOne({email:email})
    .then(user => { 
        if(user){
            console.log(user.email);
            if(password === user.password){
                res.json("Success")
                console.log(user.address);
            } else {
                res.json("Password Incorrect")
            }
        } else {
            res.json("User Not Registered")
        }
    })
})

const pdfSchema = new mongoose.Schema({
    content: Buffer,
  });
  
const PdfModel = mongoose.model('Pdf', pdfSchema);

app.post('/save-pdf', async (req, res) => {
    const pdfData = req.body.content;
    console.log(pdfData);
    try {
      const newPdf = new PdfModel({ content: pdfData });
      await newPdf.save();
      res.status(201).json({ message: 'PDF saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save PDF' });
    }
  });
  
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    connect();
})