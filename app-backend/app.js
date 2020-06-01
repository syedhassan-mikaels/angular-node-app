const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/** Setup Routes */
app.use('/product', productRoutes);

app.listen(3000);

module.exports = app;
