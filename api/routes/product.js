const express=require('express');
const router=express.Router();
const Product=require('../models/product');
const mongoose=require('mongoose');
const multer =require('multer');
const checkauth=require('../middleware/check-auth');
const _product=require('../controllers/product')

const storage=multer.diskStorage(     {
                               destination:function(req,file,cb){
                                    console.log('in destination');
                                           cb(null,'./uploads/');
                                                                },
                                                                  
                                filename:function(req,file,cb){
                                 console.log('in filename');
                                cb(null,file.originalname);
                                }
                                   

    });

    const filefilter=(req,file,cb)=>{

       console.log('in file filter');
        if(file.mimetype==='image/png'||file.mimetype==='image/jpeg')
        {
            console.log('returning true');
            cb(null,true);
        }
        else{
            console.log('returning false');
            cb(null,false);
        }
       

    };

const upload=multer(
    {
       
    storage:storage,
    //limits:{fileSize:1024*1024*5},
    fileFilter:filefilter
}

);


router.get('/',_product.getProduct);

router.post('/',checkauth,upload.single('imageupload'),_product.createProduct);

router.get('/:id',checkauth,_product.getProductWithId);

router.delete('/:id',checkauth,_product.deleteProduct);

router.patch('/:id',checkauth,_product.updateProduct);

module.exports=router;