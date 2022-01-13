const db = require('../db');

const addProduct = (product) => {
  return db
    .query(`INSERT INTO products (id, name, seller_id, price, sold, description, url)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [product.id, product.name, product.seller_id, product.price, product.sold, product.description, product.url]
    )
    .then((result) => {
      // console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));
};

const getAllProducts = () => {

  return db
    .query(`SELECT *
  FROM products`)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    });
};

const getProductById = (id) => {
  return db
    .query(`SELECT *
    FROM products
    WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => console.log(err));
};

const getWishProductsByUserId  = (id) => {
  return db
    .query(`SELECT products.name as product_name, users.username as name
    FROM wish_items
    JOIN products ON  product_id = products.id
    JOIN users ON user_id = users.id
    WHERE users.id = $1`, [id])
    .then((result) => {
      // console.log(`result:`, result.rows);
      return result.rows;
    })
    .catch(err => console.log(err));
};




const getOrdersProductsByUserId = (id) => {
  return db
    .query(`SELECT * FROM products
    JOIN order_items ON products.id = product_id
    JOIN orders ON orders.user_id  = order_items.user_id
    WHERE orders.user_id = $1`,[id])

    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getProductsByOrderId = (id) => {
  return db
    .query(`SELECT * FROM products
  JOIN order_items ON products.id = product_id
  JOIN orders ON orders.user_id  = order_items.user_id
  WHERE orders.id = $1`, [id])
    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getProductsByFilter = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return db
      .query(`SELECT * FROM products
              WHERE price >= $1 AND price <= $2`,[minPrice, maxPrice])
      .then((response) => {
        // console.log(response.rows);
        return response.rows;
      });
  } else if (minPrice) {
    return db
      .query(`SELECT * FROM products
                WHERE price >= $1
              `,[minPrice])
      .then((response) => {
        // console.log(response.rows);
        return response.rows;
      });
  } else if (maxPrice) {
    return db
      .query(`SELECT * FROM products
                WHERE price <= $1
              `, [maxPrice])
      .then((response) => {
        // console.log(response.rows);
        return response.rows;
      })
      .catch(err => console.log(err));
  }

  return db
    .query(`SELECT * FROM products
          `)
    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));

};

const getProductsByCartId = (id) => {
  return db
    .query(`SELECT *
        FROM cart_items
              JOIN products ON product_id = products.id
              WHERE cart_items.id = $1`, [id])
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.log(err));
};



const addProductToCart = (id, userId, productId) => {
  return db
    .query(`INSERT INTO cart_items ( id, user_id, product_id)
      VALUES ($1, $2, $3);`,[id, userId, productId]
    )
    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

const addProductToWishlist = (id, userId, productId) => {
  return db
    .query(`INSERT INTO wish_items ( id, user_id, product_id)
      VALUES ($1, $2, $3);`,[id, userId, productId]
    )
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};


const removeProductFromWishItemsById = (id) => {
  return db
    .query(`DELETE FROM wish_items
              WHERE product_id = $1`, [id])
    .then((response) => {
      // console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

const removeProductFromCartById = (id) => {
  return db
    .query(`DELETE FROM cart_items
              WHERE product_id = $1`, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const removeProductByid = (id) => {
  return db
    .query(`DELETE FROM products
    WHERE id = $1`, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};


module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getWishProductsByUserId,
  getOrdersProductsByUserId,
  getProductsByOrderId,
  getProductsByFilter,
  getProductsByCartId,
  addProductToCart,
  addProductToWishlist,
  removeProductFromCartById,
  removeProductFromWishItemsById,
  removeProductByid
};

