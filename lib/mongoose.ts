import mongoose from 'mongoose'
let isConnected = false;
export const connectToDB =async ()=>{
    mongoose.set('strictQuery',true); //let know unknown field query
    if(!process.env.MONGODB_URL){
return console.log("mongo DB connected")
    }
    if(isConnected) return console.log("already connected")
try{
await mongoose.connect(process.env.MONGODB_URL)
isConnected=true
console.log("connected to mogodb")
}
catch(error){
console.log(error)
}
}