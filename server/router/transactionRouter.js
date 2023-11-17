
const router = require("express").Router();
const { transactionController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");

router.get('/', verifyToken, transactionController.getAll)
router.post('/', verifyToken, transactionController.createTransaction)

module.exports = router;