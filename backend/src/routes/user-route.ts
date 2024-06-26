import { Router } from "express";
import userController from "../controllers/user-controller";
const router = Router();

router.get('/:id', userController.getUserById)
router.post("/", userController.createUser);



export default router;