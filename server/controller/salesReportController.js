const db = require("../models")
const User = db.User;
const Product = db.Product;
const Transaction = db.Transaction;
const TransactionDetail = db.Transaction_detail;

module.exports = {
    getAllTransaction: async (req, res) => {
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
                        ]
                    },
                    {
                        model: User,
                        attributes: ['fullname']
                    }
                ]
            });

            return res.status(200).send(transactions);
        } catch (err) {
            console.error(err);
            return res.status(400).send({ message: err.message })
        }
    },
}
