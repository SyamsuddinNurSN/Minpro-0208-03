const db = require("../models")
const Category = db.Category

module.exports = {
    addCategory: async (req, res) => {
        try {
            const result = await Category.create({
                categoryName: req.body.name
            })
            res.status(200).send(result, "Success creating new category")
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
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

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    }
}