import { Router } from "express";
import { UserController } from "api/controller/auth";


const userRouter = Router();
userRouter.post('/', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/forgot-password', UserController.forgotPassword);
userRouter.post('/update-password', UserController.updatePassword);
userRouter.post('/refresh', UserController.refresh);
export default userRouter;