const UserController = require("../controllers/user.controller");
const middleWare = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get(
    "/api/users",
    middleWare.authenticate,
    middleWare.getIdFromToken,
    UserController.getOneUser
  );
  app.post("/api/logout", UserController.logout);
};
