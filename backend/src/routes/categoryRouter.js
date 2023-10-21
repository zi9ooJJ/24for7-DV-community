import express from "express";
import { checkAppJson, loginRequired, adminOnly } from "../middlewares";
import { categoryController } from "../controllers";

const categoryRouter = express.Router();

categoryRouter.post(
  "/categories",
  loginRequired,
  adminOnly,
  checkAppJson,
  categoryController.addCategory,
);
categoryRouter.get("/categories", categoryController.getCategories);
categoryRouter.get("/categories/:categoryId", categoryController.getCategory);
categoryRouter.patch(
  "/categories/:categoryId",
  loginRequired,
  adminOnly,
  checkAppJson,
  categoryController.setCategory,
);
categoryRouter.delete(
  "/categories/:categoryId",
  loginRequired,
  adminOnly,
  categoryController.deleteCategory,
);

export { categoryRouter };
