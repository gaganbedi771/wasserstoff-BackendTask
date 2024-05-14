const userRepository = require("../repository/userRepository");
exports.createUser=async(userData)=>{
    try {
        const user=userRepository.get({username:userData.username});
        if(user){
            throw("user already exists")
        }
    } catch (error) {
        
    }
}