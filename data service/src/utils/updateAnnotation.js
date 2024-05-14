const imageRepository = require("../repository/imageRepository");

exports.updateAnnotations=async(annotations,id)=>{
    try {
        return await imageRepository.updateAnnotations(annotations,id)
    } catch (error) {
        console.log(error)
        throw error
    }
}