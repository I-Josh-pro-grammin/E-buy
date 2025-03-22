import { isValidObjectId } from "mongoose";

const checkId =(req,nex, next)=>{
  if(!req.params.id){
    res.status(404).json(`Invalide object of: ${req.params.id}`)
  }
   next()
}

export { checkId } 