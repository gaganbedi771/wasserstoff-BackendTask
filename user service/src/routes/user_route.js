const express=require("express");
const router=express.Router();
const validationMiddleware=require("../middlewares/inputValidation");
const userController=require("../controllers/userController");

router.post("/signup",userController.signUp);
router.post("/signin",validationMiddleware.validateCreateUserInput,userController.signIn);
router.get("/authenticate",userController.authenticate);




module.exports=router;