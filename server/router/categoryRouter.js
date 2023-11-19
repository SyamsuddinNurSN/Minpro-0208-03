const router = require('express').Router();
const { categoryController } = require("../controller");
const { multerUpload } = require('../middleware/multer');

router.get('/', categoryController.getAll);
router.post('/', multerUpload().single('img'), categoryController.addCategory);
router.patch('/:id', multerUpload().single('img'), categoryController.updateCategory)

router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategorybyId)

module.exports = router