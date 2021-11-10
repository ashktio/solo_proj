const { authenticate } = require("../middleware/jwt.middleware");
const PostController = require("../controllers/post.controller");

module.exports = (app) => {
  app.post("/api/post", authenticate, PostController.createPost);
  app.get("/api/post", authenticate, PostController.getAllPosts);
  app.get("/api/post/:id", authenticate, PostController.getOnePost);
  app.put("/api/post/:id", authenticate, PostController.updatePost);
  app.delete("/api/post/:id", authenticate, PostController.deletePost);
  app.put("/api/post/like/:id", authenticate, PostController.likePost);
  app.put("/api/post/unlike/:id", authenticate, PostController.unlikePost);
};
