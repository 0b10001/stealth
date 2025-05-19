import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { getUserTasks, createTask } from '../controllers/taskController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id/tasks', getUserTasks);
router.post('/:id/tasks', createTask);

export default router; 