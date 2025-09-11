import { Router } from 'express';
import { register, login, getUserInfo } from '../Controllers/AuthContoller.js';
import verifyToken from '../Middlewares/AuthMiddleWare.js';

const authRoutes = Router();

authRoutes.post('/signup', register)
authRoutes.post('/login',  login);
authRoutes.get('/get-user-info',verifyToken,  getUserInfo);



export default authRoutes;