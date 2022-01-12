const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
const productQueries = require('../db/queries/products_queries');

//router for home_page, admin_center
// GET /products/
router.get('/', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
      // res.json(products);
      const templateVars = {products};//use test.ejs for testing
      res.render("products_index",templateVars);//products_index.ejs
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
      // res.json(product);
      const templateVars = {product};
      res.render("product_id", templateVars);//render product_id.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for wishlist, need join wish and users table
// GET /products/wishlist/:user_id
router.get('/wishlist/:user_id', (req, res) => {
  productQueries.getWishProductsByUserId(req.params.user_id)
    .then((products) => {
      // res.json(products);
      const templateVars = {products};
      res.render("wishlist", templateVars); //render wishlist.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for orderlist, need join orders,order_items,products table
// GET /products/orderlist/:user_id
router.get('/orderlist/:user_id', (req, res) => {
  productQueries.getOrdersProductsByUserId(req.params.user_id)
    .then((products) => {
      // res.json(products);
      const templateVars = {products};
      res.render("orderlist", templateVars);//render orderlist.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for single order, need join products and order_items table
// GET /products/order/:order_id
router.get('/order/:order_id', (req, res) => {
  productQueries.getProductsByOrderId(req.params.order_id)
    .then((products) => {
      // res.json(products);
      const templateVars = {products};
      res.render("order_id", templateVars);//render order_id.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for single order, need join products and order_items table
// GET /products/order/:order_id
router.get('/admin/:user_id', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
    //res.json(products);
    //render index.ejs file
      const templateVars = {products};
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//GET /products/checkout/:product_id(Allow user to buy 1 item per order)
router.get('/checkout/:product_id', (req, res) => {
  productQueries.getProductById(req.params.product_id)
    .then((product) => {
      // res.json(product);
      const templateVars = {product};
      res.render("checkout", templateVars);//render checkout.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
//<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>
//GET /products/cart/:user_id
router.get('/cart/:user_id', (req, res) => {
  productQueries.getCartProductsByUserId(req.params.user_id)//
    .then((products) => {
      // res.json(products);
      const templateVars = {products};
      res.render("cart", templateVars);//render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// This route is for testing for post,put and delete
router.get('/test/test', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
      // res.json(products);
      const templateVars = {products};//use test.ejs for testing
      res.render("test",templateVars);//products_index.ejs
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//router for price filter, need join products and order_items table
// POST /products/price_filter
router.post('/filter', (req, res) => {
  let {minPrice, maxPrice} = req.body;
  productQueries.getProductsByFilter(minPrice, maxPrice)
    .then((products) => {
      const templateVars = {products};
      res.render("test", templateVars);//render products_list.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//POST /products/delete_product   removeProductByid
router.delete('/product/:id', (req, res) => {
  productQueries.removeProductByid(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("admin_center", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//POST /products/edit_product   editProductByid
router.put('/product/:id', (req, res) => {
  productQueries.editProductByid(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("admin_center", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//POST /products/add_product addProduct
router.post('/product/:id', (req, res) => {
  productQueries.addProduct(req.params.id)//>>>>>>>>>>>>>should be product be prameter
    .then((products) => {
      res.json(products);
      // res.render("admin_center", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//<<<<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//POST /products/cart/add_product   addProducttoCart
router.post('/cart/:car_id/product/:prodcut_id', (req, res) => {
  productQueries.addProducttoCart(req.params.car_id,req.params.prodcut_id)
    .then((products) => {
      res.json(products);
      // res.render("cart", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
//<<<<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//POST /products/cart/delete_product   removeProductFromCartByid
router.delete('/cart/product/:id', (req, res) => {
  productQueries.removeProductFromCartByid(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("cart", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//POST /products/wishlist/add_product   addProducttoWishlist
router.post('/wishlist/add_product/:id', (req, res) => {
  productQueries.addProductToWishlist(req.params.id)
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

//POST /products/wishlist/delete_product   removeProductFromWishlist
router.delete('/wishlist/delete_product/:id', (req, res) => {
  productQueries.removeProductFromWishlist(req.params.id)
    .then((products) => {
      res.json(products);
      // res.render("cart", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// export the router object
module.exports = router;
