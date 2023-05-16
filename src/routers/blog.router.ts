import { Router } from "express";
import {
  create,
  getOne,
  list,
  updateBlog,
} from "../controllers/blog.controller";
import { useAuth } from "../middlewares/useAuth";

export const blogRouter: Router = Router();

blogRouter.get("/", list);
blogRouter.get("/:slug", getOne);
blogRouter.patch("/:slug", useAuth, updateBlog);
blogRouter.post("/", useAuth, create);
