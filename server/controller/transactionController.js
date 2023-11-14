

module.exports =  {



// Endpoint untuk membuat transaksi



createTransaction : async (req, res) => {
    try {
      const { products } = req.body;
  
      // Buat transaksi
      const transaction = await Transaction.create({});
      const transactionId = transaction.TransactionID;
  
      let totalAmount = 0;
  
      // Proses setiap produk dalam transaksi
      for (const product of products) {
        const { productId, quantity } = product;
  
        // Ambil informasi produk
        const selectedProduct = await Product.findByPk(productId);
  
        // Cek ketersediaan stok
        if (selectedProduct.StockQuantity < quantity) {
          return res.status(400).json({ error: 'Stok produk tidak mencukupi.' });
        }
  
        // Kurangi stok produk
        await selectedProduct.decrement('StockQuantity', { by: quantity });
  
        // Hitung subtotal dan totalAmount
        const subtotal = selectedProduct.Price * quantity;
        totalAmount += subtotal;
  
        // Tambahkan detail transaksi
        await TransactionDetail.create({
          TransactionID: transactionId,
          ProductID: productId,
          Quantity: quantity,
          Subtotal: subtotal,
        });
      }
  
      // Update totalAmount pada transaksi
      await transaction.update({ TotalAmount: totalAmount });
  
      return res.status(201).json({ message: 'Transaksi berhasil.', totalAmount });
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Gagal melakukan transaksi.' });
    }
  },
  getAll: async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: TransactionDetail,
            include: [Product],
          },
        ],
      });
  
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Gagal mendapatkan riwayat transaksi.' });
    }
  },

  // Endpoint untuk mendapatkan rincian tagihan berdasarkan ID transaksi terbaru
getBill: async (req, res) => {
    try {
      // Dapatkan ID transaksi terbaru
      const latestTransaction = await Transaction.findOne({
        order: [['TransactionID', 'DESC']],
        include: [
          {
            model: TransactionDetail,
            include: [Product],
          },
        ],
      });
  
      if (!latestTransaction) {
        return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
      }
  
      const {
        TransactionID,
        TransactionDetails,
        TotalAmount,
        AmountCustomer,
        Change,
      } = latestTransaction;
  
      // Format data rincian tagihan sesuai kebutuhan
      const billDetails = {
        transactionId: TransactionID,
        products: TransactionDetails.map(detail => ({
          productName: detail.Product.ProductName,
          price: detail.Product.Price,
          quantity: detail.Quantity,
          subtotal: detail.Subtotal,
        })),
        totalAmount: TotalAmount,
        amountCustomer: AmountCustomer,
        change: Change,
      };
  
      return res.status(200).json(billDetails);
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Gagal mendapatkan rincian tagihan.' });
    }
  },
  

  }