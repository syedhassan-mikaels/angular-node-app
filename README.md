# Web App - Angular9 + Material Design + Node + Express + MySql

## Introduction
This application demonstrates the management of product store.

## Functionalities

1. User able to create new product.
2. Products are displayed properly based on the name & price.
3. User can search products by specified date range.

## Tools and Technologies

- Frontend Technology: Angular-9, Material Design, HTML, SCSS
- Backend Technology: Nodejs, Express
- Database : MySql

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/syedhassan-mikaels/angular-node-app.git
$ Restore database file in your MySql client which placed on main directory "db.sql"
$ Configure your database settings- open **app-backend/config/db.js** and do necessary changes
$ cd app-frontend
$ npm install
$ npm start
$ cd app-backend
$ npm install
$ npm start
```

Your frontend app should now be running on [localhost:4200](http://localhost:4200/).
Your backend app should now be running on [localhost:3000](http://localhost:3000/).
