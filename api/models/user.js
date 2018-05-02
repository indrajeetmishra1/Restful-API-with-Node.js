const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true,
       // unique:true,
       // match:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    },
    password:{type:String,required:true}
   
});

module.exports=mongoose.model('User',userschema);