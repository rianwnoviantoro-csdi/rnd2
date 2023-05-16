import { Router } from "express";
import {
  create,
  deleteBlog,
  getOne,
  list,
  updateBlog,
} from "../controllers/blog.controller";
import { useAuth } from "../middlewares/useAuth";

export const blogRouter: Router = Router();

blogRouter.get("/", list);
blogRouter.get("/:slug", getOne);
blogRouter.post("/", useAuth, create);
blogRouter.patch("/:slug", useAuth, updateBlog);
blogRouter.delete("/:slug", useAuth, deleteBlog);
