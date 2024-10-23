import express from 'express';
import { signup, signin, logout, checkCookie, userDetails } from "../controller/userController.js";
import middleware from "../middleWare/middleWare.js"; // Assuming this is your JWT authentication middleware

const router = express.Router();

// Routes
router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/logout', logout);
router.get('/check-cookie', checkCookie);
router.get('/user-details', middleware, userDetails); // Add leading slash and apply middleware

export default router;
