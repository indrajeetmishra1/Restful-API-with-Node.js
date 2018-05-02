const Order=require('../models/order');
var mongoose=require("mongoose");
//const Order=require('../models/order');
const Product=require('../models/product');

exports.getallorder=(req,res,next)=>{
 
    Order.find().populate('product','name').exec().then(result=>{

     _result= result.map(doc=>{
          
              return {
                  quantity:doc.quantity,
                  product:doc.product,
                  request:{
                      Type:"Get",
                      OrderUrl:"http://localhost:3000/order/"+doc._id
                  }
                }
      });
    
      res.status(200).json(_result);
       
  }).catch(err=>{res.status(500).json(err=>{

          error:err;

  })});

   

}
exports.getOrderById=(req,res,next)=>{

    var orderid=req.params.orderid;
    Order.findById(orderid)
    .populate('product','name')
    .exec()
    .then(result=>{

         const response={

                      Orderid:result._id,
                      quantity:result.quantity,
                      product:result.product
                     }

            res.status(200).json(response);         


    })
    .catch(err=>{

        res.status(500).json(err=>{error:err});
    })
    

}
exports.createOrder=(req,res,next)=>{
  const order=new Order({
 _id:new mongoose.Types.ObjectId(),
 product:req.body.productid,
 quantity:req.body.quantity
})
console.log(order);
order.save()
.then(result=>{
console.log(result);

res.status(400).json({

  Message: "data has been created successfully",
  
  result:{productid:result.product,quantity:result.quantity},
  Orderurl:"http://localhost:3000/order/"+result._id
})

})

.catch(err=>{
     res.status(500).json({error:err});
})
    }

exports.deleteOrder=(req,res,next)=>{
    var id=req.params.id;
    Order.remove({_id:id})
    .exec()
    .then(result=>{
    
    res.status(400).json({
    
        Message:"Order has been deleted successfully with id-----"+id,
        Result:result
      });
    
    })
    .catch(err=>{error:err})
    }


    exports.updateOrder=(req,res,next)=>{
                              
        var id=req.params.id;
        const _data={};
        for (const ops of req.body)
        {
            _data[ops.propname]=ops.value;
        }

        console.log(_data);

        Order.update({_id:id},{$set:_data})
        .exec()
        .then(data=>{
        
             var _message={
                 message:" below Data has been updated in database",
                 result:data
             }

             res.status(200).json(_message);

        })
        .catch(err=>{
   
          res.status(500).json({error:err});

        })
    }
    