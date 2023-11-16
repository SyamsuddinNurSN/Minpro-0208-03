
const router = require("express").Router();
const { transactionController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");

router.get('/', verifyToken, checkRole, transactionController.getAll)
router.post('/', verifyToken, checkRole, transactionController.createTransaction)

module.exports = router;