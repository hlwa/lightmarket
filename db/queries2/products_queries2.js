/**5. getProductsByCartId? getOrdersProductsByUserId(req.params.id) (product2 file sql)duygu
6. getProductsByOrderId(req.params.id)(product2 file sql)duygu
7. getProductsByFilter(minPrice, Maxprice)(product2 file sql)duygu
8. getProductsByCartId? (product2 file sql) duygu
 */
const db = require('./db');

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
// const getProductsByCartId = (id) => {
//   return db
//     .query(`SELECT * FROM products
//             WHERE    `)
// }

module.exports = {
  getOrdersProductsByUserId,
  getProductsByOrderId,
  getProductsByFilter
};

