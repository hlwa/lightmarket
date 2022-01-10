// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// load .env data into process.env
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let receiver = '+12049221870';
let message = 'This is the ship that made the Kessel Run in fourteen parsecs?';

client.messages
  .create({
    body: message,
    from: '+19546377158',
    to: receiver
  })
  .then(message => console.log(message.sid));
