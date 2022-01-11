// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


const addProduct = (product) => {
  return db
    .query(`INSERT INTO products (id, name, seller_id, price, sold, description, url)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [product.id, product.name, product.seller_id, product.price, product.sold, product.description, product.url]
    )
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));
};
const product = {
  'id':'110',
  'name': 'mask101',
  'seller_id':'1',
  'price': '3.99',
  'sold': 'false',
  'description': 'test',
  'url': 'https://unsplash.com/photos/u4gX3FWzchM'
};
//addProduct(product);

const getAllProducts = () => {
  return db
    .query(`SELECT *
  FROM products`)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    });
};

//getAllProducts();


const getProductById = (id) => {
  return db
  .query(`SELECT *
  FROM products
  WHERE id = $1`, [id])
  .then((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  });
};


// getProductById(1);
const getWishProductsByUserId  = (id) => {
  return db
    .query(`SELECT products.name as product_name, users.username as name
  FROM wish_items
  JOIN products ON  product_id = products.id
  JOIN users ON user_id = users.id
  WHERE users.id = $1`, [id])
    .then((result) => {
      console.log(`result:`, result.rows);
      return result.rows;
    });
 };

  //getWishProductsByUserId(2);
  const getOrdersProductsByUserId = (id) => {
    return db
    .query(`SELECT * FROM products
    JOIN order_items ON products.id = product_id
    JOIN orders ON orders.id = order_id
    WHERE orders.user_id = $1`,[id])

      .then((response) => {
        console.log(response.rows);
        return response.rows;
      })
      .catch(err => console.log(err));
  };
  //getOrdersProductsByUserId(2);
  const getProductsByOrderId = (id) => {
    return db
      .query(`SELECT * FROM products
              JOIN order_items ON products.id = product_id
              WHERE order_id = $1`, [id])
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      })
      .catch(err => console.log(err));
  };
  //getProductsByOrderId(2);
  const getProductsByFilter = (minPrice, maxPrice) => {
    if (minPrice && maxPrice) {
      return db
      .query(`SELECT * FROM products
              WHERE price >= $1 AND price <= $2`,[minPrice, maxPrice])
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      })
    } else if (minPrice) {
      return db
      .query(`SELECT * FROM products
                WHERE price >= $1
              `,[minPrice])
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      });
    } else if (maxPrice) {
      return db
      .query(`SELECT * FROM products
                WHERE price <= $1
              `, [maxPrice])
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      })
      .catch(err => console.log(err));
    }
  };
  //getProductsByFilter(10, null);
  const getProductsByCartId = (id) => {
    return db
      .query(`SELECT *
        FROM cart_items
              JOIN products ON product_id = products.id
              WHERE cart_items.id = $1`, [id])
              .then((result) => {
                console.log(result.rows);
                return result.rows;
              })
              .catch(err => console.log(err));
   }
   //getProductsByCartId(2);
   const getUserById = (id) => {
    return db
    .query(`SELECT *
    FROM users
    WHERE id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));
  }
  //getUserById(2);

  const addProductToCart = (id, userId, productId) => {
    return db
      .query(`INSERT INTO cart_items ( id, user_id, product_id)
      VALUES ($1, $2, $3);`,[id, userId, productId]
      )
      .then((response) => {
        console.log(response.rows);
        return response.rows;
      })
      .catch(err => console.log(err));
   }
   //addProductToCart(6,2, 3);
   const addProductToWishlist = (id, userId, productId) => {
    return db
      .query(`INSERT INTO wish_items ( id, user_id, product_id)
      VALUES ($1, $2, $3);`,[id, userId, productId]
      )
      .then((response) => {
        return response.rows;
      })
      .catch(err => console.log(err));
   }

//addProductToWishlist(4, 3, 7);
const removeProductFromWishItemsById = (id) => {
  return db
    .query(`DELETE FROM wish_items
            WHERE product_id = $1`, [id])
    .then((response) => {
      console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
 }
 //removeProductFromWishItemsById(2);

 const removeProductFromCartById = (id) => {
  return db
    .query(`DELETE FROM cart_items
            WHERE product_id = $1`, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
 }
 removeProductFromCartById(3);