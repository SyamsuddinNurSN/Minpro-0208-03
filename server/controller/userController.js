const db = require("../models");
const User = db.User;
const Cashier = db.Cashier;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const sequelize = require("../database");

// Import model atau koneksi database yang diperlukan

module.exports = {
  // Endpoint untuk registrasi admin
  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, role } = req.body;

      // Cek apakah admin sudah terdaftar
      const existingAdmin = await User.findOne({
        where: { email, role: "admin" },
      });

      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists" });
      }

      // Enkripsi password sebelum disimpan
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Membuat user admin baru
      await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });

      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCashier: async (req, res) => {
    try {
      const result = await User.findAndCountAll();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: err.message });
    }
  },

  // Endpoint untuk login
  login: async (req, res) => {
    try {
      let isUserExist;
      const { username, email, password } = req.body;

      if (username) {
        isUserExist = await User.findOne({
          where: {
            username,
          },
        });
      } else if (email) {
        isUserExist = await User.findOne({
          where: {
            email,
          },
        });
      }

      if (!isUserExist) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Periksa kecocokan password
      const passwordMatch = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Buat token JWT untuk user dengan menambahkan role ke payload
      const payload = { id: isUserExist.id, role: isUserExist.role };
      const token = jwt.sign(payload, "LogIn");

      console.log("ini user", isUserExist);

      // Lakukan tindakan berdasarkan peran pengguna
      if (isUserExist.role === "admin") {
        // Tindakan untuk admin
        console.log("Admin login");
        // Lakukan apa yang diperlukan untuk admin
      } else if (isUserExist.role === "cashier") {
        // Tindakan untuk cashier
        console.log("Cashier login");
        // Lakukan apa yang diperlukan untuk cashier
      }

      res.status(200).json({
        message: "logged in successfully",
        result: isUserExist,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  registerCashier: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { fullname, username, email, password, role } = req.body;

      // Encrypt password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the role "cashier"
      const newUser = await User.create(
        {
          fullname,
          username,
          email,
          password: hashedPassword,
          role: "cashier",
        },
        { transaction: t }
      );

      // Find the maximum CashierId from existing Cashier records
      const maxCashierId = await Cashier.max("id", { transaction: t });

      // Increment the maximum CashierId by 1 for the new cashier
      const newCashierId = maxCashierId ? maxCashierId + 1 : 1;

      // Create a new cashier connected to the new user
      const newCashier = await Cashier.create(
        {
          id: newCashierId,
          UserId: newUser.id,
        },
        { transaction: t }
      );

      // Commit transaksi jika semuanya berhasil
      await t.commit();

      res.status(201).json({ message: "Cashier created successfully" });
    } catch (error) {
      console.error(error);
      // Rollback transaksi jika terjadi kesalahan
      await t.rollback();
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  keepLogin: async (req, res) => {
    try {
      const result = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  },

};
