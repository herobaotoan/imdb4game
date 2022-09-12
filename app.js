require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'client/build')));

//routers
const games = require("./router/gameRouter.js")
app.use('/', games)
const users = require("./router/userRouter.js")
app.use('/', users)


const auth = require("./middleware/auth");

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});



// All other GET requests not handled before will return our React app
 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
 });

module.exports = app;
