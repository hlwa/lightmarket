/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
require("dotenv").config();
const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/user-queries');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const tPHONE = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

//"GET"  /message_page/:id  getUserByid
router.get("/message_page/:id", (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(data => {
      const user = data;
      res.json(user);
      // res.render("message_page", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//"POST"  /message_send/:id  getUserByid
router.post("/message_send/:id", (req, res) => {
  const user = req.body;
  client.messages
    .create({
      body: user.message,
      from: tPHONE,
      to: user.mobile
    })
    .then(message => console.log(message.sid))
    .then(message => {
      res.json({ message });
      // res.render("message_page", templateVars) //render .ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// export the router object
module.exports = router;
