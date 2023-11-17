// Example router configuration

const router = require("express").Router();

// Your router configuration...

const { userController } = require("../controller");
const { checkRole, verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");



router.post("/", userController.registerAdmin);
router.patch("/reset-password", userController.resetPassword);
router.patch("/update-password", userController.updateUserPassword);
router.delete("/delete-cashier/:id", userController.deleteCashier);
router.post(
  "/cashiers",
  verifyToken,
  checkRole,
  userController.registerCashier
);
// router.patch("/update-user", userController.editbyid);
router.post("/login", userController.login);
// router.get("/", userController.getAll)
router.get("/keep-login", verifyToken, userController.keepLogin);
router.patch(
  "/:id",
  verifyToken,
  multerUpload().single("profile_picture"),
  userController.editProfile
);
router.get("/list-cashier", userController.getCashier);

module.exports = router;
