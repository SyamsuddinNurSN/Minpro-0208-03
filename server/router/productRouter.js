const router = require("express").Router()
const { productController } = require('../controller')

// const { verifyToken }
// const { multerUpload }

router.get('/', productController.getAllProduct)

router.post('/', productController.createProduct)

module.exports = router