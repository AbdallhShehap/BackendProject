const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductsDetailsController")

router.post('/add',products.addProductDetails );

router.put('/edit/:id', products.editProductDetails );

router.delete('/delete/:id', products.deleteProductDetails );

router.get('/getproductdetails' , products.getProductDetails)

router.get('/getproductdetails/:id' , products.getProductDetailsById)

router.get('/getproductdetailsbycategory/:id' , products.getProductDetailsByCategory)

module.exports = router
