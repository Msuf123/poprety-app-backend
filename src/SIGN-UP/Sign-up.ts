import { Router, Request, Response } from 'express';
import { verifyToken } from '../CustomFunctions/JWtToken/JWtToken';
import checkIfUserNameIsUnique from '../CustomFunctions/UniqueName/uniqueName';
import { hashPassword } from '../CustomFunctions/Hashing/Hashing';
import InsertUser from '../CustomFunctions/VerfiyUser/InsertUser';

const signUp = Router();
signUp.use((req:any,res,next)=>{
 
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Splitting to get the token
  req.token=token
  next()
})
signUp.get("/isLoggedIN",(req:any,res,next)=>{
    const token='kk'
    if(verifyToken(token)){
        res.send('okay')
    }
    else{
      res.send('unauth')
    }
})
signUp.post("/login",(req,res,next)=>{
  const { username, pass } = req.body
  console.log(username, pass)
  res.send('no')
})
signUp.post('/signup',async (req: Request, res: Response,next) => {
    const {username,pass,phone}=req.body
    const isOkay=await checkIfUserNameIsUnique(username).catch((a)=>a)
    if(isOkay){
      const hasedPassword=await hashPassword(pass)
      if(hasedPassword){
        const isnertedUser=await InsertUser(username,pass,phone)
        if(isnertedUser){
          res.send('okay')
          next('errr')
        }
      }else{
        console.log('error genrasting passwodr')
        next('error')
      }
    }
    else{
        next('error')
    }
   
});

export default signUp;
