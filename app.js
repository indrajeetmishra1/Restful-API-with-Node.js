const express=require('express');
const app=express();
const morgan=require('morgan')
const bodyparser=require('body-parser');
const mongoose=require('mongoose');

var productroute=require('./api/routes/product');
var orderroute=require('./api/routes/order');
var userroute=require('./api/routes/user');

mongoose.connect('mongodb+srv://eshop-node:'+
                  process.env.MONGO_ATLAS_PW+
                  '@cluster0-p41fj.mongodb.net/test');
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/uploads',express.static('uploads'))
// app.use((req,res,next)=>{

//     res.header("Acess-Control-Allow-Origin","*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept,Authorization");
//     if(req.method==='OPTIONS'){
//         res.header('Acess-Control-Allow-Methods','PUT,GET,DELETE,PATCH,PUT');
//         return res.status(200).json({});
//     }

// });
app.use('/product',productroute);
app.use('/order',orderroute);
app.use('/user',userroute);


app.use((req,res,next)=>{

var error=new Error('Not Found');
error.status=404;
next(error);

});

app.use((error,req,res,next)=>{

    res.status(error.status||500);
    res.json({
        message:"route not defined",
        error:error
    });

});

module.exports=app;