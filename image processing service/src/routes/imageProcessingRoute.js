const express=require("express");
const router=express.Router();
const validationMiddleware=require("../middlewares/inputValidation");
const iamgeProcessingController=require("../controllers/imageProcessingController");

router.post("/",iamgeProcessingController.process);
// router.post("/signin",validationMiddleware.validateCreateUserInput,userController.signIn);
// router.get("/authenticate",userController.authenticate)



module.exports=router;