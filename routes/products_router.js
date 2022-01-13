const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();
const productQueries = require('../db/queries/products_queries');
const userQueries = require('../db/queries/user-queries');

//http://localhost:8080/products/
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

//http://localhost:8080/products/2
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


//http://localhost:8080/products/wishlist/wishlist
router.get('/wishlist/wishlist', (req, res) => {
  // console.log(req.cookies);
  const user = req.cookies.id;
  productQueries.getWishProductsByUserId(user)//req.params.user_id
    .then((products) => {
      // res.json(products);

      const templateVars = {products,user};

      res.render("wish_items", templateVars); //render wishlist.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//http://localhost:8080/products/orderlist/:user_id
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


//http://localhost:8080/products/order/:order_id

router.get('/order/:order_id', (req, res) => {
  const user = req.cookies.id;
  productQueries.getProductsByOrderId(req.params.order_id)
    .then((products) => {
      // res.json(products);
      const templateVars = {products, user};
      res.render("orders", templateVars);//render order_id.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//http://localhost:8080/products/admin/:user_id
router.get('/admin/:user_id', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
    //res.json(products);
    //render index.ejs file
      const templateVars = {products};
      res.render("admin", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//http://localhost:8080/products/admin/add/product
router.get('/admin/add/product', (req, res) => {
  productQueries.getAllProducts()
    .then((products) => {
    //res.json(products);
    //render index.ejs file
      const templateVars = {products};
      res.render("add-product", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//http://localhost:8080/products/checkout/:product_id
router.get('/checkout/:product_id', (req, res) => {
  const userId = req.cookies.id;
  productQueries.getProductById(req.params.product_id)
    .then((product) => {
      userQueries.getUserById(userId)
        .then((user) => {
          const templateVars = {product,user};
          res.render("checkout", templateVars);//render checkout.ejs file
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/filter', (req, res) => {
  let {minPrice, maxPrice} = req.body;
  productQueries.getProductsByFilter(minPrice, maxPrice)
    .then((products) => {
      res.status(200).json({products});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/delete/:id', (req, res) => {
  productQueries.removeProductByid(req.params.id)
    .then(res.redirect('/products/admin/:user_id'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  productQueries.getAllProducts()
    .then((products) => {
      const templateVars = { products }; //use test.ejs for testing
      res.render("admin_index", templateVars);
    // res.render("admin_index", templateVars)
    });

});

router.post('/marksold/:id', (req, res) => {
  productQueries.editProductByid(req.params.id)//mark as sold
    .then(res.redirect('/products/admin/:user_id'))//redirect('/products/admin/:user_id'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//helper
const randomNum = (n) => {
  let res = "";
  for (let i = 0; i < n; i++) {
    res += Math.floor(Math.random() * 10);
  }
  return res;
};


router.post('/add_product', (req, res) => {
  const seller_id = 1 || req.cookies.id;
  const id = randomNum(5);
  const sold = false;
  let {name, price, description, url} = req.body;
  productQueries.addProduct({id, name, seller_id, price, sold, description, url})//>>>>>>>>>>>>>should be product be prameter
    .then(res.redirect('/products/'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/checkout/:product_id', (req, res) => {
  const userId = Number(req.cookies.id);
  const productId = Number(req.params.product_id);
  const time = '2022-12-12 12:00:00';
  const id = randomNum(2);
  console.log(id, userId, productId);
  productQueries.addToOrderlist(id, userId, time)//>>>>>>>>>>>>>should be product be prameter
    .then(() => {
      productQueries.addToOrderItems(id, userId, productId)//>>>>>>>>>>>>>should be product be prameter
        .then(res.redirect(`/products/order/${id}`))
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});




router.post('/wishlist/add_product/:product_id', (req, res) => {
  const userId = req.cookies.id;
  const wishId = randomNum(3);
  productQueries.addProductToWishlist(wishId,userId,req.params.product_id)//id, userId, productId
    .then(res.redirect('/products/wishlist/wishlist'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/wishlist/delete_product/:id', (req, res) => {
  productQueries.removeProductFromWishItemsById(req.params.id)
    .then(res.redirect('/products/wishlist/wishlist'))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// export the router object
module.exports = router;


// //<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>
// //GET /products/cart/:user_id
// router.get('/cart/:user_id', (req, res) => {
//   productQueries.getCartProductsByUserId(req.params.user_id)//
//     .then((products) => {
//       // res.json(products);
//       const templateVars = {products};
//       res.render("cart", templateVars);//render .ejs file
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// //router for price filter, need join products and order_items table
// // POST /products/price_filter
// router.post('/filter', (req, res) => {
//   let {minPrice, maxPrice} = req.body;
//   productQueries.getProductsByFilter(minPrice, maxPrice)
//     .then((products) => {
//       const templateVars = {products};
//       res.render("products_index.ejs", templateVars);//render products_list.ejs file
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// // This route is for testing for post,put and delete
// router.get('/test/test', (req, res) => {
//   productQueries.getAllProducts()
//     .then((products) => {
//       // res.json(products);
//       const templateVars = {products};//use test.ejs for testing
//       res.render("test",templateVars);//products_index.ejs
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// //<<<<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// //POST /products/cart/add_product   addProducttoCart
// router.post('/cart/:car_id/product/:prodcut_id', (req, res) => {
//   productQueries.addProducttoCart(req.params.car_id,req.params.prodcut_id)
//     .then((products) => {
//       res.json(products);
//       // res.render("cart", templateVars) //render .ejs file
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
// //<<<<<<<<<<<<<<<<<<<Cart feature is stretch>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// //POST /products/cart/delete_product   removeProductFromCartByid
// router.delete('/cart/product/:id', (req, res) => {
//   productQueries.removeProductFromCartByid(req.params.id)
//     .then((products) => {
//       res.json(products);
//       // res.render("cart", templateVars) //render .ejs file
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });



// // This route is for testing for post,put and delete
// router.get('/test/test', (req, res) => {
//   productQueries.getAllProducts()
//     .then((products) => {
//       // res.json(products);

//       const templateVars = {products};//use test.ejs for testing
//       res.render("test",templateVars);//products_index.ejs
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
