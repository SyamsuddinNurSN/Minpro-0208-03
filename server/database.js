// sequelize-config.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    "username": "root",
    "password": "123456a",
    "database": "tasmart",
    "host": "127.0.0.1",
    "dialect": "mysql"
  });

module.exports = sequelize;
