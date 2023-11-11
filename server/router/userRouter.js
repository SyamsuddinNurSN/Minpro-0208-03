const router = require("express").Router();
const { userController } = require("../controller");
// const { verifyToken } = require("../middleware/auth");

router.post("/", userController.registerAdmin);
router.post("/login", userController.loginAdmin);
// router.get("/", userController.getAll);
// router.get("/keep-login", verifyToken, userController.keepLogin)
// router.get("/:id", userController.getById);
// router.delete("/:id", userController.deleteUser);
// router.patch("/", verifyToken, userController.editUser);
// router.patch("/change-pass", verifyToken, userController.editPassword);


module.exports = router;
