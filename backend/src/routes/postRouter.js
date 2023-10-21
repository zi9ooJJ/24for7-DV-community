import express from "express";
import { checkAppJson, loginRequired } from "../middlewares";
import { postController } from "../controllers";

const postRouter = express.Router();

postRouter.post("/posts", loginRequired, checkAppJson, postController.addPost);
postRouter.get("/posts", postController.getPosts);
postRouter.get(
  "/posts/category/:categoryId",
  postController.getPostsByCategory,
);
postRouter.get("/posts/myposts", loginRequired, postController.getMyPosts);
postRouter.get(
  "/posts/search/:search",
  postController.getPostsByTitleSearching,
);
postRouter.get("/posts/:postId", postController.getPost);
postRouter.patch(
  "/posts/:postId",
  loginRequired,
  checkAppJson,
  postController.setPost,
);
postRouter.delete("/posts/:postId", loginRequired, postController.deletePost);

export { postRouter };
