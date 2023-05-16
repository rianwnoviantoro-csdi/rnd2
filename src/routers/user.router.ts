import { Router } from "express";
import { login, register } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
