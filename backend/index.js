const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config();
const port = process.env.PORT || 5000;
// console.log(process.env);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use((req, res, next) => {
  const reqString = `${req.method} ${req.url} ${Date.now()}\n`;
  fs.writeFile('log.txt', reqString, { flag: 'a' }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use('/v1/auth', authRoute); //middleware

app.use((err, req, res, next) => {
  const reqString = `${req.method} ${req.url} ${Date.now()} ${err.message}\n`;
  fs.writeFile('error.txt', reqString, { flag: 'a' }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(500).send('Internal Server Error');
  next();
});

app.listen(port, () => {
  console.log(`Running on ${port}!`);
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
});
