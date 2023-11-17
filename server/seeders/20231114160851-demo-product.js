"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("products", [
      {
        name: " Cappucino1",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: "Cappucino2",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2,
      },
      {
        name: "Cappucino3",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3,
      },
      {
        name: "Cappucino4",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3,
      },
      {
        name: "Cappucino5",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: "Cappucino6",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2,
      },
      {
        name: "Cappucino7",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2,
      },
      {
        name: "Cappucino8",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      },
      {
        name: "Cappucino9",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3,
      },
      {
        name: "Cappucino10",
        price: 5000,
        stock: 20,
        img: null,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products,", null, {});
  },
};
