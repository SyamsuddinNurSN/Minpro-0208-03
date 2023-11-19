const router = require("express").Router();

const { userController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const { multerUpload } = require("../middleware/multer");

router.post("/", userController.registerAdmin);
router.patch("/reset-password", userController.resetPassword);
router.patch("/update-password", userController.updateUserPassword);
router.delete("/delete-cashier/:id", userController.deleteCashier);
router.patch("/verify-Cashier/:id", userController.verifyCashier);
router.patch("/enable-Cashier/:id", userController.enableCashier);
router.post(
  "/cashiers",
  verifyToken,
  checkRole,
  userController.registerCashier
);

router.post("/login", userController.login);

router.get("/keep-login", verifyToken, userController.keepLogin);
router.patch(
  "/:id",
  verifyToken,
  multerUpload().single("profile_picture"),
  userController.editProfile
);
router.get("/list-cashier", userController.getCashier);

module.exports = router;
