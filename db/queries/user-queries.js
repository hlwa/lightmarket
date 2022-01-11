const db = require('../db');
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
};

module.exports = {getUserById};
