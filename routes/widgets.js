/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
require("dotenv").config();
const express = require('express');
const router  = express.Router();
const userQueries = require('../db/user-queries');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//"GET"  /message_page/:id  getUserByid
router.get("/message_page/:id", (req, res) => {
  userQueries.getUserByid(req.params.id)
    .then(data => {
      const user = data.rows[0];
      res.json({ user });
      // res.render("message_page", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//"GET"  /message_send/:id  getUserByid
router.get("/message_send/:id", (req, res) => {
  userQueries.getUserByid(req.params.id)
    .then(data => {
      const user = data.rows[0];
      res.json({ user });
      return user;
    })
    .then(user => {
      client.messages
        .create({
          body: user.message,
          from: '+19546377158',
          to: user.mobile
        })
        .then(message => console.log(message.sid));
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// export the router object
module.exports = router;
