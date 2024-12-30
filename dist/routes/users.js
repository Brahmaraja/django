import express from 'express';
import { body } from 'express-validator';
import { register, login, getUserDetails, updateUser, deleteUser } from '../controllers/users.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty()
], register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], login);

router.get('/:id', authenticate, getUserDetails);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;