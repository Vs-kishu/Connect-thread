import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
text:{type:String,required:true},
author:{
   type: mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
},
community:{
    type : mongoose.Schema.Types.ObjectId ,
    ref:'Community',
},
crreatedAt:{
    type:Date,
    default:Date.now()
},
parentId:{
    type:String
},
children:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Thread' // one thread having multiple threads
    }
]

});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
