"use strict";
const { Model } = require("sequelize");
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction
      )
    }
  }
  User.init(
    {
      fullname: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM("admin", "cashier"), allowNull: false },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false},
      profile_picture: { type: DataTypes.STRING, allowNull: true},
      isEnabled: {type: DataTypes.BOOLEAN,defaultValue: true}
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
