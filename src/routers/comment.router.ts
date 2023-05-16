import { Router } from "express";
import { create } from "../controllers/comment.controller";
import { useAuth } from "../middlewares/useAuth";

export const commentRouter: Router = Router();

commentRouter.post("/:slug", useAuth, create);
