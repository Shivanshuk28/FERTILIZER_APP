import {Router} from "express"
import {signin , signup} from "../controllers/userController.js";
import User from '../model/userModel.js';
import {validateSignup,validateSignin} from "../middlewares/validate_ware.js";

const router =Router();
router.post('/signup',validateSignup,signup);
router.post('/signin',validateSignin,signin);
router.get('/all_users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});



export default router;