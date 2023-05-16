import { Router } from "express";
import { userRouter } from "./user.router";
import { blogRouter } from "./blog.router";
import { useAuth } from "../middlewares/useAuth";
import { commentRouter } from "./comment.router";
import { tagRouter } from "./tag.router";

const router: Router = Router();

router.use("/auth", userRouter);
router.use("/blogs", blogRouter);
router.use("/comments", commentRouter);
router.use("/tags", tagRouter);

export default router;
