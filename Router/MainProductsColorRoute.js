const express = require('express');
const router = express.Router();
const products = require("../Controller/MainColorController")

router.post('/add',products.addProductColorMain );


router.put('/edit/:id', products.editProductColorMain);


router.delete('/delete/:id', products.deleteProductColorMain);

router.get('/getcolorproductdetails' , products.getProductColorMain)

router.get('/getcolorproductdetails/:id' , products.getProductColorMainById)


module.exports = router
