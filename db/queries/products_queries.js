const db = require('./db');

const addProduct = (id) => {
  return db
  .query(`SELECT *
  FROM products
  WHERE id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  });
};

const getAllProducts = () => {
  return db
  .query(`SELECT *
  FROM products`)
  .then((result) => {
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
    });
  };

  const getWishProductsByUserId  = (id) => {
    return db
    .query(`SELECT products.name as product_name, users.name as name
    FROM wish_items
    JOIN products ON  product_id = products.id
    JOIN users ON user_id = users.id
    WHERE user.id = $1`, [id])
    .then((result) => {
      return result.rows;
    });
    };




const getOrdersProductsByUserId = (id) => {
  return db
    .query(`SELECT * FROM products
            JOIN order_items ON products.id = product.id
            JOIN orders ON order_id = orders.id
            WHERE orders.user_id = $1`,[id])
    .then((response) => {
      return response.rows;
    });
};

const getProductsByOrderId = (id) => {
  return db
    .query(`SELECT * FROM products
            JOIN order_items ON products.id = product_id
            WHERE order_id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
};

const getProductsByFilter = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return db
    .query(`SELECT * FROM products
              WHERE price >= minPrice && price <= maxPrice`)
    .then((response) => {
      return response.rows;
    });
  } else if (minPrice) {
    return db
    .query(`SELECT * FROM products
              WHERE price >= minPrice
            `)
    .then((response) => {
      return response.rows;
    });
  } else if (maxPrice) {
    return db
    .query(`SELECT * FROM products
              WHERE price <= maxPrice
            `)
    .then((response) => {
      return response.rows;
    });
  }
};

const getProductsByCartId = (id) => {
  return db
    .query(`SELECT * FROM products
            JOIN carts ON cart_id = carts.id
            WHERE carts.id = $1`, [id])
 }

const getUserById = (id) => {
  return db
  .query(`SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  });
}

const addProductToCart = (userId, productId) => {
  return db
    .query(`INSERT INTO wish_items ( user_id, product_id)
    VALUES ($1, $2)RETURNING *,`[userId, productId]
    )
    .then((response) => {
      return response.rows;
    });
 }

 const addProductToWishlist = (userId, productId) => {
  return db
    .query(`INSERT INTO wish_items ( user_id, product_id)
    VALUES ($1, $2)RETURNING *,`[userId, productId]
    )
    .then((response) => {
      return response.rows;
    });
 }


 const removeProductFromWishItemsById = (id) => {
  return db
    .query(`DELETE FROM wish_items
            WHERE products.id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
 }

 const removeProductFromCartById = (id) => {
  return db
    .query(`DELETE FROM cart_items
            WHERE products.id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
 }


module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  getWishProductsByUserId,
  getOrdersProductsByUserId,
  getProductsByOrderId,
  getProductsByFilter,
  getUserById,
  getProductsByCartId,
  addProductToCart,
  addProductToWishlist,
  removeProductFromCartById,
  removeProductFromWishItemsById

};

