import express from 'express';
// const express=require("express")
const app=express() 
// const dotenv=require('dotenv')
import dotenv from 'dotenv'
import path from 'path'
import{ callerfnc} from './dsa.js'
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.render("index")
    
})

app.get('/ask', (req, res) => {
    res.status(405).send('Method Not Allowed - Please use POST');
});

app.post('/ask',async (req,res)=>{
    const userinput=req.body.input
    // console.log(req.body);
    const response=await callerfnc(userinput)
    
    // console.log('user input was ' + userinput);
    res.status(201).json({response:response})
    
})


app.listen(process.env.port,()=>{
    console.log('listening on given port');
    
})