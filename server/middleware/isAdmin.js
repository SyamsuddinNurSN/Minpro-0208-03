const isAdminLoggedIn = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      // Cek apakah admin sudah login
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
  
      // Set informasi admin ke objek req untuk digunakan di endpoint selanjutnya
      req.admin = admin;
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };