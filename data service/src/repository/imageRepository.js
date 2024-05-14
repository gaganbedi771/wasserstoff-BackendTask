const Image = require("../models/image");

exports.create = async (data) => {
  try {
    // console.log(data);
    return await Image.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.updateAnnotations = async (annotations,id) => {
  try {
    console.log(annotations,id);
    const updatedUser = await Image.findOneAndUpdate(
      { _id: id },
      { 'imageDetails.annotations': annotations },
      { new: true }
    );
    console.log(updatedUser);
    return
  } catch (error) {
    console.log(error)
    throw error;
  }
};

exports.getAll=async()=>{
  try {
    return await Image.find({status:"Pending"})
  } catch (error) {
    console.log(error)
    throw error;
  }
}

exports.update=async(data,id)=>{
  try {
    const updatedData=Image.findByIdAndUpdate({_id:id},{status:data})
  } catch (error) {
    console.log(error)
    throw error;
  }
}