const db = require("../models")
const Product = db.Product
const Category = db.Category

module.exports = {
    getAllActiveProduct: async (req, res) => {
        try {
            const allProduct = await Product.findAll({
                where: {
                    isActive: true
                },
                include: [
                    {
                        model: Category,
                        attributes: ['categoryName']
                    }
                ],
            })
            res.status(200).send({ allProduct })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getActiveProductById: async (req, res) => {
        try {
            const result = await Product.findOne({
                where: {
                    id: req.params.id,
                    isActive: true
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

    getActiveProductByCategoryId: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;

            const products = await Product.findAll({
                where: {
                    categoryId,
                    isActive: true
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
    // http://localhost:2000/products/category/7

    getActiveProductByKeyword: async (req, res) => {
        const { keyword } = req.query

        try {
            const products = await Product.findAll({
                where: db.sequelize.where(
                    db.sequelize.fn('LOWER', db.sequelize.col('name')),
                    'LIKE',
                    `%${keyword.toLowerCase()}%`
                ),
                where: {
                    isActive: true
                },
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
    // http://localhost:2000/products/search?keyword=latte

    getSortedActiveProducts: async (req, res) => {
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
        // http://localhost:2000/products/sort?sort=price_desc

        try {
            const sortedProducts = await Product.findAll({
                order: sortOption,
                where: {
                    isActive: true
                },
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
}