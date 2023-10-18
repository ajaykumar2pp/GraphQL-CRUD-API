require('dotenv').config();
const mongoose = require('mongoose')

const ConnectMongoose =()=> mongoose.connect(process.env.DATABSAE_URL,{
    useNewUrlParser:true
}).then(()=>{
    console.log("GraphQL is connected to mongoDB")
}).catch((error)=>{
  console.log("GraphQL is NOT Connected to mongoDB",error)
})

module.exports ={ConnectMongoose}
