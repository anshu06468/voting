var express=require("express");
var bodyparser=require("body-parser");
const userRouter = require('./router/route');
var cors = require('cors')
var app=express();

app.use(bodyparser.json());
app.use(cors())
app.use(userRouter)



app.listen(8000,()=>{
    console.log(`Server running on port 8000`)
});