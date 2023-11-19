const db = require("../models");
const User = db.User;
const Product = db.Product;
const Transaction = db.Transaction;
const TransactionDetail = db.Transaction_detail;
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

module.exports = {
  // Endpoint untuk membuat transaksi

  createTransaction: async (req, res) => {
    try {
      const { total_amount, customer_amount, change, quantity } = req.body;

      // Create the transaction
      const transaction = await Transaction.create({
        total_amount,
        customer_amount,
        change,
        UserId: req.user.id,
      });

      // Loop through cart items and create transaction details
      for (const item of req.body.cartItems) {
        const selectedProduct = await Product.findOne({
          where: {
            id: item.id,
          },
        });

        if (selectedProduct) {
          const subTotal = item.price * item.quantity;

          // Create detail transaction for each product in the cart
          await TransactionDetail.create({
            TransactionId: transaction.id,
            ProductId: selectedProduct.id,
            quantity: item.quantity,
            subTotal,
          });
        } else {
          console.log(`Product with id ${item.id} not found`);
          return res
            .status(404)
            .send({ message: `Product with id ${item.id} not found` });
        }
      }

      console.log("Transaction created successfully");
      res.status(201).send({ message: "Transaction created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const transactions = await Transaction.findAndCountAll({
        include: [
          {
            model: TransactionDetail,
            include: [
              {
                model: Product,
                attributes: ['id', 'name', 'price', 'stock', 'categoryId']
              }
            ],
          },
        ],
      });

      return res.status(200).send(transactions);
    } catch (error) {
      console.error("Error:", error.message);
      return res
        .status(500)
        .send({ error: "Gagal mendapatkan riwayat transaksi." });
    }
  },
};
