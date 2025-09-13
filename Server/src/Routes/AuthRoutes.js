import { Router } from 'express';
import { register, login, getUserInfo, fetchDrivers } from '../Controllers/AuthContoller.js';
import verifyToken from '../Middlewares/AuthMiddleWare.js';

const authRoutes = Router();

authRoutes.post('/signup', register)
authRoutes.post('/login',  login);
authRoutes.get('/get-user-info',verifyToken,  getUserInfo);
authRoutes.get("/drivers", fetchDrivers);




export default authRoutes;