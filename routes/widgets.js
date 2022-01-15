/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


const router  = express.Router();
const userQueries = require('../db/queries/user-queries');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const tPHONE = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

//"GET"  /message_page/:id  getUserByid
router.get("/message_page/:id", (req, res) => {
  const user = {'name':req.cookies.username,'id':req.cookies.id};
  if (!user.id) {
    return res.send("<html><body><b>Please signin!</b></body></html>\n");
  }
  userQueries.getUserById(user.id)
    .then(user => {
      const templateVars = {user};
      // res.json(user);
      res.render("Messages", templateVars);//render message_page.ejs file
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//"POST"  /message_send/:id  getUserByid
router.post("/message_page/send/:id", (req, res) => {
  const message = req.body;
  console.log('------------------',message);
  const id = req.cookies.id;
  client.messages
    .create({
      body: message.message,
      from: tPHONE,
      to: message.mobile
    })
    .then(message => console.log(message.sid))
    .then(res.redirect(`/api/widgets/message_page/${id}`))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// export the router object
module.exports = router;
