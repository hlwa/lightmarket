const express = require('express');
const router = express.Router();
const productQueries = require('../db/product-queries');

//router for home_page, admin_center
// GET /products/
router.get('/', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
      res.json(products);
      // res.render("products_list", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for single_product_detail
// GET /products/:id
router.get('/:id', (req, res) => {
  productQueries.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
      // res.render("prodcut_id", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for wishlist, need join wish and users table
// GET /products/wishlist/:user_id
router.get('/wishlist/:id', (req, res) => {
  productQueries.getWishProductsByUserId(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("wishlist", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for orderlist, need join users, orders,order_items,products table
// GET /products/orderlist/:user_id
router.get('/orderlist/:id', (req, res) => {
  productQueries.getOrdersProductsByUserId(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("orderlist", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for single order, need join products and order_items table
// GET /products/order/:order_id
router.get('/order/:id', (req, res) => {
  productQueries.getProductsByOrderId(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("order_id", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for price filter, need join products and order_items table
// POST /products/price_filter
router.post('/price_filter', (req, res) => {
  let {minPrice, Maxprice} = req.body;
  productQueries.getProductsByFilter(minPrice, Maxprice)
    .then((products) => {
      res.json(products);
      // res.render("order_id", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export the router object
module.exports = router;
