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
      // Buat transaksi
      const { total_amount, customer_amount, change, quantity } = req.body;
      const transaction = await Transaction.create({
        total_amount,
        customer_amount,
        change,
        UserId: req.user.id,
      });

      // Ambil informasi produk
      const selectedProduct = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (selectedProduct) {
        // Hitung nilai subtotal
        const subtotal = quantity * selectedProduct.price;

        // Buat detail transaksi
        await TransactionDetail.create({
          TransactionId: transaction.id,
          ProductId: selectedProduct.id,
          quantity,
          price: selectedProduct.price,
          subtotal,
        });

        console.log("Transaction created successfully");
        res.status(201).send({ message: "Transaction created successfully" });
      } else {
        console.log("Product not found");
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const transactions = await Transaction.findandCountAll({
        include: [
          {
            model: TransactionDetail,
            include: [Product],
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
