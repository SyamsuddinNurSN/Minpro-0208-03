const db = require("../models")
const Category = db.Category

module.exports = {
    addCategory: async (req, res) => {
        try {
            const { categoryName } = req.body

            const result = await Category.create({
                categoryName,
                img: req.file?.path
            })

            console.log(result);

            res.status(200).send(result)
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await Category.findAndCountAll();
            res.status(200).send({ result })
        } catch (err) {
            console.log("This is the error", err);
            res.status(400).send({ message: err.message })
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const result = await Category.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send({ result })
        } catch (err) {
            console.log(err);
            res.status(400).send({ messsage: err.message })
        }
    },

    deleteCategorybyId: async (req, res) => {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send("Success deleting category")
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { categoryName } = req.body

            const result = await Category.update(
                {
                    categoryName,
                    img: req.file?.path
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )

            res.status(200).send({ message: "Success updating category", data: result })
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    }
}