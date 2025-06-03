import express from 'express';
import controller from '../controllers/userController';
import auth from '../middlewares/auth';

const router = express.Router();
router.post('/register', controller.registerUser);
router.post('/login', controller.authentication);
router.get('/', auth, controller.userList);
router.put('/:id', auth, controller.userUpdate)
router.delete('/:id', auth, controller.userDelete);

export default router;
