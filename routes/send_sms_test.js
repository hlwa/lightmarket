// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// load .env data into process.env
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const tPHONE = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

let receiver = '+6473035334';
let message = 'This is the ship that made the Kessel Run in fourteen parsecs?';

client.messages
  .create({
    body: message,
    from: tPHONE,
    to: receiver
  })
  .then(message => console.log(message.sid));
