import { Router } from "express";
import { create, getOne, list } from "../controllers/blog.controller";
import { useAuth } from "../middlewares/useAuth";

export const blogRouter: Router = Router();

blogRouter.get("/", list);
blogRouter.get("/:slug", getOne);
blogRouter.post("/", useAuth, create);
