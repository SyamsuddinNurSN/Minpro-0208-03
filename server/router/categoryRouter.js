const router = require('express').Router();
const { categoryController } = require("../controller");
const { getCategoryById } = require('../controller/categoryController');
const { multerUpload } = require('../middleware/multer');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getCategoryById);

router.post('/', multerUpload().single('img'), categoryController.addCategory);

module.exports = router