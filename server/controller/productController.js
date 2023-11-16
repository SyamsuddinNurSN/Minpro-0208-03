const db = require("../models")
const Product = db.Product
const Category = db.Category

module.exports = {
    createProduct: async (req, res) => {
        try {
            const { name, price, stock, description, categoryId } = req.body

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
                    description,
                    img: req.file?.path,
                    categoryId
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
            const allProduct = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['categoryName']
                    }
                ]
            });
            res.status(200).send({ allProduct })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    }
}