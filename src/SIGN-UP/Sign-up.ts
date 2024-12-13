import { Router, Request, Response } from 'express';
import { verifyToken } from '../CustomFunctions/JWtToken/JWtToken';

const router = Router();

router.get("isLoggedIN",(req:Request,res,next)=>{
    const token=req.token as string
    if(verifyToken())
})
router.post('/signup', (req: Request, res: Response) => {
   
    res.status(200).send('Signup route is working');
});

export default router;
