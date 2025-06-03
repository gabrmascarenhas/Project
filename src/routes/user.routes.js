import express from 'express';
import controller from '../controllers/userController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, controller.userList)

