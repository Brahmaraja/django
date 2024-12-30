import express from 'express';
import { body } from 'express-validator';
import {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment
} from '../controllers/comments.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/task/:taskId/comments', getComments);
router.post('/task/:taskId/comments', [
  body('content').trim().notEmpty()
], createComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;