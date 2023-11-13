// Example router configuration

const router = require("express").Router();

// Your router configuration...

const { userController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");

router.post("/", userController.registerAdmin);
router.post(
  "/cashiers",
  verifyToken,
  checkRole,
  userController.registerCashier
);
router.post("/login", userController.login);
// router.get("/", userController.getAll)
router.get("/keep-login", verifyToken, userController.keepLogin)

module.exports = router;
