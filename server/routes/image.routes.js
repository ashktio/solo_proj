const { authenticate } = require("../middleware/jwt.middleware");
const ImageController = require("../controllers/image.controller");

module.exports = (app) => {
  app.post("/api/upload", authenticate, ImageController.addImage);
  app.get("/api/images/:id", authenticate, ImageController.getImage);
  app.delete("/api/images", authenticate, ImageController.deleteImage);
};
