/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/user-queries');

//console.log(userQueries.getUserById);

//"GET"  /login/:id  getUserByid

router.get("/login/:id", (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(data => {
      const user = data;
      res.json(user);
      console.log(`user is:`,user);
      // res.render("products_list", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export the router object
module.exports = router;
