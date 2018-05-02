
var jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    console.log('checkauth middleware is excuting');
try{
    const token=req.headers.authtoken.split(" ")[1];
    console.log('decoding the token');   
    console.log(token); 
    const decoded=jwt.verify(token,'secret');
    console.log(decoded);
    req.userdata=decoded;
    console.log(decoded);
    next();
    }
   catch(error){
    res.status(500).json({error:error,message:"Auth Failed"});
   }
   

        
    

}