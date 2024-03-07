const express=require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/dbConnectio')
const dotenv=require('dotenv').config()

connectDB()
const app=express()

const port=process.env.PORT || 5000


app.use(express.json())



app.use("/api/contacts", require("./routes/contactsRoute"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log('Server is up')
})