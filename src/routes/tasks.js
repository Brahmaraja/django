import express from 'express';
import { body } from 'express-validator';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/project/:projectId/tasks', getTasks);
router.post('/project/:projectId/tasks', [
  body('title').trim().notEmpty(),
  body('description').optional().trim(),
  body('status').isIn(['todo', 'in_progress', 'done']),
  body('priority').isIn(['low', 'medium', 'high']),
  body('assignedTo').optional().isUUID(),
  body('dueDate').optional().isISO8601()
], createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;