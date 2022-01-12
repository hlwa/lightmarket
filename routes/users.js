/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));



const router  = express.Router();
const userQueries = require('../db/queries/user-queries');

//console.log(userQueries.getUserById);

//"GET"  /login/:id  getUserByid

router.get("/login/:id", (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      // res.json(user);
      // const templateVars = {user};
      res.cookie('id', `${user.id}`);
      res.cookie('seller', `${user.seller}`);
      res.cookie('username', `${user.username}`);
      res.redirect('/login/products_index');
      // res.render("test");//render login.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post("/login/logout", (req, res) => {
  res.clearCookie('id');
  res.clearCookie('seller');
  res.clearCookie('username');
  res.redirect('/products/products_index');
});


// export the router object
module.exports = router;
