const express=require('express');
const router=express.Router();
const Product=require('../models/product');
const mongoose=require('mongoose');
const multer =require('multer');

exports.getProduct=(req,res,next)=>{

    Product.find().select('_id name price productimage')
    .exec()
    .then(doc=>{
         
         const response ={
         
              productCount:doc.length,
              productDetail:doc.map(data=>{
               
                return {
                     name:data.name,
                     price:data.price,
                     ProductUrl:'http://localhost:3000/product/'+data._id
                }

              }),
               }

        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json(err);
    });

//res.status(200).json({message:"get request on products route"});

}
///Create product
exports.createProduct=(req,res,next)=>{
    console.log(req.file);

        const product=new Product({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                price:req.body.price,
                productimage:req.file.path

                    });

             product.save()
             .then(response=>{
               
                const productdetail={
                    name:response.name,
                    price:response.price,
                    ProductUrl:'http://localhost:3000/product/'+response._id
                }
                console.log(productdetail);
                res.status(200).json(productdetail);
            
            })
             .catch(err=>{

               res.status(500).json(err);
                 

             });

            
            }

////get product with id
exports.getProductWithId=(req,res,next)=>{

                var id=req.params.id;
        
               Product.findById(id)
               .exec()
               .then(response=>{
                   if(response){
                    const productdetail={
                        name:response.name,
                        price:response.price,
                        ProductUrl:'http://localhost:3000/product/'+response._id,
                        productimage:response.productimage
                    }
                    console.log(productdetail);
                    res.status(200).json(productdetail);
                   }
                   else{
                       res.status(404).json({Message:"Data entry not found"});
                   }
               })
               .catch(err=>{
                   res.status(500).json(err);
               });      
                
                }

 ///Delete Product
 
 exports.deleteProduct=(req,res,next)=>{

    var id=req.params.id;

   Product.remove({_id:id})
          .exec()
          .then(doc=>{
              console.log(doc);
              res.status(200).json(doc);
            })
          .catch(err=>{

            res.status(500).json(err);
          });
    
    }

    exports.updateProduct=(req,res,next)=>{
       console.log('Updating the product');
        var id=req.params.id;
        const opsRequest={};
    
        for (const ops of req.body)
        {
            opsRequest[ops.propName]=ops.value;
        }
    
        Product.update({_id:id},{$set:opsRequest})
        .exec()
        .then(result=>{
            res.status(200).json({
            message:"Tha data update successfully",
            New_Data:result
            })
        })
        .catch(err=>{
            res.status(500).json(err);
        })
    
    }