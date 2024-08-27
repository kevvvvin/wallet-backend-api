import express from 'express';
import { authController } from '../container';
import { authenticateJWT, validateRequest } from '../middlewares';
import { loginSchema, registerSchema } from '../utils';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);
router.post('/login', validateRequest(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);
router.post('/logout', authenticateJWT, (req, res, next) =>
  authController.logout(req, res, next),
);
router.get('/validate-token', authenticateJWT, (req, res, next) =>
  authController.validateToken(req, res, next),
);

export default router;
