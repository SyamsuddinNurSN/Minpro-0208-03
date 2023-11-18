const { Op } = require('sequelize');
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
    },

    getProductById: async (req, res) => {
        try {
            const result = await Product.findOne({
                where: {
                    id: req.params.id,
                },

                include: [
                    {
                        model: Category,
                        attributes: ["categoryName"],
                    },
                ],
            });
            res.status(200).send({ result })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getProductByCategoryId: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;

            const products = await Product.findAll({
                where: {
                    categoryId
                },
                include: [
                    {
                        model: Category,
                        attributes: ['categoryName']
                    }
                ]
            })
            res.status(200).send({ products })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getProductByKeyword: async (req, res) => {
        const { keyword } = req.query

        try {
            const products = await Product.findAll({
                where: db.sequelize.where(
                    db.sequelize.fn('LOWER', db.sequelize.col('name')),
                    'LIKE',
                    `%${keyword.toLowerCase()}%`
                ),
                include: [
                    {
                        model: Category,
                        attributes: ['categoryName']
                    }
                ]
            });

            res.status(200).send({ products })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getSortedProducts: async (req, res) => {
        const { sort } = req.query;
        let sortOption;

        switch (sort) {
            case 'name_asc':
                sortOption = [['name', 'ASC']]
                break;
            case 'name_desc':
                sortOption = [['name', 'DESC']];
                break;
            case 'price_asc':
                sortOption = [['price', 'ASC']];
                break;
            case 'price_desc':
                sortOption = [['price', 'DESC']];
                break;
            default:
                sortOption = [['createdAt', 'DESC']]; // Default sorting criteria
                break;
        }

        try {
            const sortedProducts = await Product.findAll({
                order: sortOption,
                include: [
                    {
                        model: Category,
                        attributes: ['categoryName']
                    }
                ]
            })

            res.status(200).send({ sortedProducts })
        } catch (err) {
            console.log("Error fetching sorted products", err);
            res.status(400).send({ message: err.message })
        }
    },

    updateProductStatus: async (req, res) => {
        try {
            const { id } = req.params
            const { isActive } = req.body

            const product = await Product.findOne({
                where: {
                    id
                }
            })

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            // Update only the 'isActive' property
            product.isActive = isActive;
            await product.save()

            res.status(200).send({ message: "Product status updated successfully" })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    updateByid: async (req, res) => {
        try {
            const { name, price, stock, description, categoryId } = req.body

            const result = await Product.update(
                {
                    name,
                    price,
                    stock,
                    description,
                    categoryId,
                    img: req.file?.path
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.status(200).send({ result })

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    }

}