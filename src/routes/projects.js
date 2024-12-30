import express from 'express';
import { body } from 'express-validator';
import { 
  getProjects, 
  createProject, 
  getProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projects.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getProjects);
router.post('/', [
  body('name').trim().notEmpty(),
  body('description').optional().trim()
], createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;