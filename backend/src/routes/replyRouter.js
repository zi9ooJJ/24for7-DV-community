import express from "express";
import { replyController } from "../controllers";
import { checkAppJson, adminOnly, loginRequired } from "../middlewares";

const replyRouter = express.Router();

replyRouter.post(
  "/replies",
  loginRequired,
  checkAppJson,
  replyController.addReply,
);
replyRouter.get(
  "/replies",
  loginRequired,
  adminOnly,
  replyController.getReplies,
);
replyRouter.get("/posts/:postId/replies", replyController.getRepliesByPost);
replyRouter.get(
  "/replies/myreplies",
  loginRequired,
  replyController.getMyReplies,
);
replyRouter.get("/replies/:replyId", replyController.getReply);
replyRouter.patch(
  "/replies/:replyId",
  loginRequired,
  checkAppJson,
  replyController.setReply,
);
replyRouter.delete(
  "/replies/:replyId",
  loginRequired,
  replyController.deleteReply,
);

export { replyRouter };
