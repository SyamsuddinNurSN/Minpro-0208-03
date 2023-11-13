// sequelize-config.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    "username": "root",
    "password": "Isam26798@",
    "database": "cashier_app",
    "host": "127.0.0.1",
    "dialect": "mysql"
  });

module.exports = sequelize;
