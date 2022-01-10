/**
1.addProduct(product file sql) georgina
2.getAllProducts(product file sql) georgina
3.getProductById(req.params.id) (product file sql) georgina
4.getWishProductsByUserId(req.params.id) (product file sql) georgina

5. getProductsByCartId? getOrdersProductsByUserId(req.params.id) (product2 file sql)duygu
6. getProductsByOrderId(req.params.id)(product2 file sql)duygu
7. getProductsByFilter(minPrice, Maxprice)(product2 file sql)duygu
8. getProductsByCartId? (product2 file sql) duygu
 */
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
            WHERE id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
};

const getProductsByFilter = (minPrice, maxPrice) => {
  return db
    .query(`SELECT * FROM products
            WHERE price >= minPrice && price <= maxPrice`)
    .then((response) => {
      return response.rows;
    });
};

const getProductsByCartId = (id) => {
  return db
    .query(`SELECT * FROM products
            JOIN carts ON cart_id = carts.id
            WHERE carts.id = $1`, [id])
 }


// getUserById
// addProducttoCart
// removeProductFromCartById
// addProductToWishlist
// removeProductFromWishlist

const getUserById = (id) => {
  return db
  .query(`SELECT *
  FROM users
  WHERE id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  });
};

const addProducttoCart = (id) => {
  return db
    .query(`SELECT * FROM carts
            JOIN products ON product_id = products.id
            WHERE products.id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
 }

 const addProductToWishlist = (id) => {
  return db
    .query(`SELECT * FROM wish_items
            JOIN products ON product_id = products.id
            WHERE products.id = $1`, [id])
    .then((response) => {
      return response.rows;
    });
 }

 const removeProductFromCartById = (id) => {
  return db
    .query(`DELETE FROM carts
            WHERE products.id = $1`, [id])
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
  addProducttoCart,
  addProductToWishlist,
  removeProductFromCartById,
  removeProductFromWishItemsById

};

