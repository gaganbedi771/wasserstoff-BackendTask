const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId,required:true},
  username:{type:String, required: true},
  role: {type:String, required: true}
})

// const annotationSchema=new mongoose.Schema({})

const imageDetailsSchema=new mongoose.Schema({
  name:{type:String,required:true},
  url:{type:String,required:true},
  annotations:[]
})

const ImageSchema = new mongoose.Schema({
    imageDetails: {
        type: imageDetailsSchema
    },
    user:{type:userSchema, require:true},
    status: {
        type: String,
        enum: [
            "Pending",
            "Approved",
            "Rejected"
        ],
        default: "Pending"
    }
 
});


const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;


// {
// image:{
//   path:"url",
//   annotation: [ {} ],
// },
// "User": {
//   "userId": "UUID",
//   "username": "username",
//   "role": "user/admin"
//   },
// status:"pending/approved/rejected"

// }