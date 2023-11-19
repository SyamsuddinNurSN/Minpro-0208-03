'use strict';

<<<<<<< HEAD
import { faker } from '@faker-js/faker';
=======

>>>>>>> ac21fe4de1a9e9f01feff474ffb8283fe9b0baf8

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
<<<<<<< HEAD
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
=======
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
>>>>>>> ac21fe4de1a9e9f01feff474ffb8283fe9b0baf8
  }
};
