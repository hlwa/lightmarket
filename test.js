/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/user-queries');

//"GET"  /login/:id  getUserByid
const usersRoutes = (db) => {


  router.get("/login/:id", (req, res) => {
    db.query('select * from users where id = $1',[req.params.id])
      .then(data => {
        const user = data.rows[0];
        res.json(user);
        // res.render("products_list", templateVars) //render .ejs file
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};

// export the router object
module.exports = usersRoutes;
