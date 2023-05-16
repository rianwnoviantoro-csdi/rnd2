import { Router } from "express";
import { create, list } from "../controllers/tag.controller";
import { useAuth } from "../middlewares/useAuth";

export const tagRouter: Router = Router();

tagRouter.get("/", list);
tagRouter.post("/", useAuth, create);
