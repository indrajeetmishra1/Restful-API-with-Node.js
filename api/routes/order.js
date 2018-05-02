var express=require('express');
var router=express.Router();
var mongoose=require("mongoose");
const Order=require('../models/order');
const Product=require('../models/product');
const checkauth=require('../middleware/check-auth');
const order=require('../controllers/orders')

router.get('/',checkauth,order.getallorder);

router.get('/:orderid',checkauth,order.getOrderById);

router.post('/',checkauth,order.createOrder);

router.delete('/:id',checkauth,order.deleteOrder);  

router.patch('/:id',checkauth,order.updateOrder);
            

module.exports=router;