const db = require("../models")
const Product = db.Product

module.exports = {
    createProduct: async (req, res) => {
        try {
            const { name, price, stock, description } = req.body

            // check if product already exist
            const findProduct = await Product.findOne({
                where: {
                    name
                }
            })

            // if product isn't existed yet
            if (findProduct == null) {
                await Product.create({
                    name,
                    price,
                    stock,
                    description
                })
            } else {
                return res.status(400).send({ message: "Product already exist" })
            }

            res.status(200).send({ message: "Create product success" })

        } catch (err) {
            console.log("This is the error", err);
            res.status(400).send({ message: err.message })
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const allProduct = await Product.findAll();
            res.status(200).send({ allProduct })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    }
}