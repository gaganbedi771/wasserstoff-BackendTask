const express=require("express");
const router=express.Router();
const validationMiddleware=require("../middlewares/inputValidation");
const imageController=require("../controllers/imageController");
const multer=require("multer");
const upload = multer({ dest: 'uploads/' });


router.post("/",upload.single('image'),imageController.storeImage);
router.get("/",validationMiddleware.isAdmin,imageController.getAll);


module.exports=router;