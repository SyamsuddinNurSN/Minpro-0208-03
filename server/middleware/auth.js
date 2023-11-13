const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(401).send({
          message: "token empty",
        });
      }
      token = token.split(" ")[1];

      let verifiedUser = jwt.verify(token, "LogIn");

      req.user = verifiedUser;
      console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  checkRole: (req, res, next) => {
    const { role } = req.user; // Assuming that the user object contains the role information
    console.log(role);

    if (role === "admin") {
      return next(); // Continue to the next middleware or route handler
    }
    return res.status(400).send({
      message: "Unauthorized (admin only) !!",
    });
  },
};
