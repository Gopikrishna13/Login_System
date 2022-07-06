const express = require('express');
const app = express();
app.use(require("./login.js"));
const mongoose = require('mongoose');



require("dotenv").config();
app.use(express.json());

const port=process.env.PORT;
const uri=process.env.MONGODB_CONNECTION_STRING;


mongoose.connect(uri);

app.listen(port,()=>{
  console.log("App is listening at "+port);
})


const connection=mongoose.connection;
connection.once("open",()=>{
  console.log("Connection created");
})


