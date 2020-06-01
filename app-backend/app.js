const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product');
const CONFIG = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./models');
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL database:', CONFIG.db_name);
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL database:', CONFIG.db_name, err);
  });
if (CONFIG.app === 'dev') {
  models.sequelize.sync();
}

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
