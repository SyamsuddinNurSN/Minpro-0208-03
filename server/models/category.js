"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Product
      Category.hasMany(models.Product, {
        foreignKey: "categoryId", // This is the foreign key in the Product table
        onDelete: "CASCADE", // Delete products when their associated category is deleted
      });
    }
  }
  Category.init(
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
