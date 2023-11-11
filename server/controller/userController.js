const db = require('../models');
const express = require('express');
const User = db.User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import model atau koneksi database yang diperlukan

module.exports ={
// Endpoint untuk registrasi admin
registerAdmin: async (req, res) => {
  try {
    const {fullname, username, email, password, role } = req.body;

    // Cek apakah admin sudah terdaftar
    const existingAdmin = await User.findOne({
      where: { email, role: 'admin' },
    });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Enkripsi password sebelum disimpan
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat user admin baru
   await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

// Endpoint untuk login admin
loginAdmin: async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek apakah admin terdaftar
    const admin = await User.findOne({
      where: { username, role: 'admin' },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Periksa kecocokan password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Buat token JWT untuk admin
    const token = jwt.sign({ userId: admin.user_id, role: admin.role }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
}


