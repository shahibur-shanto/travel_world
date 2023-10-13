import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/auth/signin', AuthController.loginUser);

export const AuthRoutes = router;
