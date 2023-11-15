// Example router configuration

const router = require("express").Router();

// Your router configuration...

const { transactionController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");

router.post('/', verifyToken, checkRole ,transactionController.createTransaction)
router.get('/', verifyToken, checkRole,transactionController.getAll)

module.exports = router;