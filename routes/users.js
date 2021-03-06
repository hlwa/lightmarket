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

//http://localhost:8080/api/users/login/2
router.get("/login/:id", (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      // res.json(user);
      // const templateVars = {user};
      res.cookie('id', `${user.id}`);
      res.cookie('seller', `${user.seller}`);
      res.cookie('username', `${user.username}`);
      res.cookie('email', `${user.email}`);
      res.cookie('mobile ', `${user.mobile}`);
      res.cookie('country', `${user.country}`);
      res.cookie('province', `${user.province}`);
      res.cookie('city ', `${user.city}`);
      res.cookie('street', `${user.street}`);
      res.cookie('postal', `${user.postal}`);
      res.redirect('/products/');
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
  res.redirect('/products/');
});


// export the router object
module.exports = router;
