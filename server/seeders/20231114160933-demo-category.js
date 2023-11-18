'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("categories", [
    {
      categoryName: "latte",
      img: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryName: "espresso",
      img: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryName: "nonCoffe",
      img: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories,", null, {})
  }
};
