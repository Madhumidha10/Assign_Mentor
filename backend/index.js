//importing required packages and modules
const express = require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const router=require('./routes/routes')
require('dotenv').config()
//creating a app
const app = express();
//app use body parser
app.use(express.json())
//app use cors
app.use(cors())
//app use port
const port=process.env.PORT
//app use routers
app.use('/',router)
//MONGODB URI
const URI=process.env.URI
//connect MONGODB 
mongoose.connect(URI).then(()=>{
    app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
}).catch((error)=>{
    console.log(error);
})

