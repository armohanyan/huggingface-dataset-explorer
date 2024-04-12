import {loginController, refreshTokenController, registerController} from "../controllers/auth";
import express from 'express'

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);


export default router