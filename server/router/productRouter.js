const router = require("express").Router()
const { productController } = require('../controller')
const { multerUpload } = require('../middleware/multer')
// const { verifyToken }
// const { multerUpload }

router.get('/', productController.getAllProduct)
router.post('/', multerUpload().single('img'), productController.createProduct)
router.get('/search', productController.getProductByKeyword);
router.get('/sort', productController.getSortedProducts);
router.get('/:id', productController.getProductById)
router.get('/category/:categoryId', productController.getProductByCategoryId)
router.patch('/:id', productController.updateProductStatus)
router.patch('/update/:id', multerUpload().single('img'), productController.updateByid)

module.exports = router