import userRouter from "./auth";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use('/auth', userRouter);
export default mainRouter;