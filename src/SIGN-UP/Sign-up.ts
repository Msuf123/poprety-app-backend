import { Router, Request, Response } from 'express';
import { createToken, verifyToken } from '../CustomFunctions/JWtToken/JWtToken';
import checkIfUserNameIsUnique from '../CustomFunctions/UniqueName/uniqueName';
import { hashPassword } from '../CustomFunctions/Hashing/Hashing';
import InsertUser from '../CustomFunctions/VerfiyUser/InsertUser';
import verifyUser from "./../CustomFunctions/VerfiyUser/VerifyUser"
const signUp = Router();
import getUser from './../CustomFunctions/VerfiyUser/getUserInfo'
signUp.use((req:any,res,next)=>{
 
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  req.token=token
  next()
})
signUp.get("/isLoggedIN",async (req:any,res,next)=>{
    const token=req.token as string
    console.log(token)
    const username=verifyToken(token)
    console.log(username)
    if(verifyToken(token)){
      res.send(await getUser(username.email))
    }
    else{
      res.send('unauth')
    }
})
signUp.post("/login",async (req,res,next)=>{
  const { username, pass } = req.body
  console.log(username,pass)
  const token=await verifyUser(username,pass)
  if(token){
    console.log("Genrated token is ",token)
  res.send(token)
  }
  else{
  res.send('nookay')
  }
})
signUp.post('/signup',async (req: Request, res: Response,next) => {
    const {username,pass,phone}=req.body
    const isOkay=await checkIfUserNameIsUnique(username).catch((a)=>a)
    if(isOkay){
      const hasedPassword=await hashPassword(pass)
      if(hasedPassword){
        const isnertedUser=await InsertUser(username,hasedPassword,phone)
        if(isnertedUser){
          res.send(createToken(username))
          
        }
      }else{
       res.send('error')
      }
    }
    else{
      res.send('usernameTaken')
    }
   
});
signUp.post("/wirteProp",async(req,res,next)=>{

})
export default signUp;
