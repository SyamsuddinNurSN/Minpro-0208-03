'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_detail.belongsTo(models.Transaction);
      // Transaction_detail.belongsTo(models.Product);

    }
  }
  Transaction_detail.init({
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subTotal: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Transaction_detail',
  });
  return Transaction_detail;
};