// Example router configuration

const router = require("express").Router();

// Your router configuration...

const { transactionController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");

router.post('/transactions', verifyToken, checkRole ,transactionController.createTransaction)
router.get('/transactions', verifyToken, checkRole,transactionController.getAll)