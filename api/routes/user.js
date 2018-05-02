const express=require('express');
const router=express.Router();
const User=require('../models/user');
const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.post('/signup',(req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(doc=>{

        if(doc.length>1){

            res.status(400).json({message:"Emailid is already exist"});
        }
        else{

            bcrypt.hash(req.body.password,10,(err,hash)=>{

                if(err)
               {
                    return res.status(500).json({error:err});
               }
       
               else{
                       const users=new User({
                     
                       _id:new mongoose.Types.ObjectId(),
                       email:req.body.email,
                       password:hash
       
                       });
       
                       users.save()
                       .then(result=>{
                           console.log(result);
                           res.status(201).json({message:"new user has been created successfully"});
                       })
                       .catch(err=>{
       
                           res.status(500).json({
                               message:"new user has not been created successfully",
                               error:err
                           
                           });
                       });
       
              
                   
               }
           });
         

        }

    })
    .catch(err=>{

        res.status(500).json(err);
    });

              });

router.get('/',(req,res,next)=>{

    res.status(400).json({message:"Thanks"});
})

router.delete('/:paramid',(req,res,next)=>{
    console.log('in delete route')

User.remove({_id:req.params.paramid})
.exec()
.then(result=>{

    res.status(400).json({
        message:"Data has been deleted successfully",
        result:result
    })
})
.catch(err=>{

    res.status(500).json({error:err});
})


});

router.post('/login',(req,res,next)=>{

    User.find({email:req.body.email})
        .exec()
        .then(result=>{
console.log(result);
             if(result.length<1)
             {
                 console.log('no entry in database');
                 res.status(401).json({
                     message:"Auth Failed"
                 });
             }
             else{

                bcrypt.compare(req.body.password,result[0].password,(err,hash)=>{

             if(err)
             {
                console.log('wrong password');
                res.status(401).json({
                    message:"Auth Failed"
                });  
             }
             else{

               const token= jwt.sign(
                   {
                    email:result[0].email,
                    id:result[0]._id
                },
                "secret",
                {
                    expiresIn:"1hr"
                });

               return res.status(400).json({
                    message:"Auth Successfull",
                    token:token
                }); 
             }

                });

             }


        })
        .catch(err=>{res.status(500).json({error:err})});

});

module.exports=router;