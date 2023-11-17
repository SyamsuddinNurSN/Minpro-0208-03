const db = require("../models");
const User = db.User;
const Transaction = db.Transaction;
const TransactionDetail = db.Transaction_detail;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");

const { create } = require("handlebars");
const transporter = require("../middleware/transporter");
const fs = require("fs");
const handlebars = require("handlebars");
const user = require("../models/user");

// Import model atau koneksi database yang diperlukan

module.exports = {
  // Endpoint untuk registrasi admin
  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, role } = req.body;

      const isEmailExist = await User.findOne({
        where: {
          email,
        },
      });

      if (isEmailExist) {
        return res.status(489).send({
          message: "email has been used",
        });
      }

      const existingAdmin = await User.findOne({
        where: { email, role: "admin" },
      });

      if (existingAdmin) {
        return res.status(400).json({ error: "Admin already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

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
      res.status(400).json({ error: "Internal Server Error" });
    }
  },

  getCashier: async (req, res) => {
    try {
      const result = await User.findAndCountAll({
        where: {
          role: "cashier",
        },
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: err.message });
    }
  },

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

      const passwordMatch = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const payload = { id: isUserExist.id, role: isUserExist.role };
      const token = jwt.sign(payload, "LogIn");

      console.log("ini user", isUserExist);

      if (isUserExist.role === "admin") {
        console.log("Admin login");
      } else if (isUserExist.role === "cashier") {
        console.log("Cashier login");
      }

      // const data = fs.readFileSync("./resetpassword.html", "utf-8");
      //   const tempCompile = await handlebars.compile(data);
      //   const tempResult = tempCompile({
      //     createdAt: result.createdAt,
      //     name: name,
      //     username: username,
      //   });

      // await transporter.sendMail({
      //   from: "amanhidayat39@gmail.com",
      //   to: email,
      //   subject: "Email Confirmation",
      //   html: tempResult,
      // });

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
    try {
      const { fullname, username, email, password, role } = req.body;
      const isEmailExist = await User.findOne({
        where: {
          email,
        },
      });

      if (isEmailExist) {
        return res.status(489).send("email has been used");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        role: "cashier",
      });

      res.status(201).json({ message: "Cashier created successfully" });
    } catch (error) {
      console.error(error);

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
  resetPassword: async (req, res) => {
    try {
      console.log(`ini req body`, req.body);
      const { email } = req.body;
      const data = fs.readFileSync("./resetpassword.html", "utf-8");
      const tempCompile = await handlebars.compile(data);
      const tempResult = tempCompile({
        email: email,
        link: `http://localhost:3000/reset-password/${email}`,
      });

      await transporter.sendMail({
        from: "amanhidayat39@gmail.com",
        to: email,
        subject: "Email Confirmation",
        html: tempResult,
      });
      res.status(200).send({ message: "Email has been sent" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { fullname, username } = req.body;
      await User.update(
        {
          fullname,
          username,
          profile_picture: req.file?.path,
        },

        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send("Profile Updated");
    } catch (error) {
      console.log(err);
      res.status(400).send({ err: err.message });
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      console.log("ini data body", req.body);

      await User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(200).send("Profile Updated");
    } catch (error) {
      console.log(err);
      res.status(400).send({ err: err.message });
    }
  },
  // editById: async (req, res) => {
  //   try {
  //     const { isVerified } = req.body;
  //     const user = await User.findOne({
  //       where: {
  //         id: req.params.id
  //       },
  //     });

  //     if (user.isVerified===true) {
  //       await user.update(

  //       )
  //     }

  //     await user.update(updateUser);
      
  //     if ("isVerified" in req.body) {
  //       user.isVerified = isVerified;
  //     }

  //     await user.update(updateUser);

  //     res.status(200).send("User has been updated");
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).send({ message: error.message });
  //   }
  // },

  deleteCashier: async (req, res) => {
    console.log(req.params);
    try {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send('Cashier Deleted');
    } catch (error) {
        console.log(error);
    }
}

};
