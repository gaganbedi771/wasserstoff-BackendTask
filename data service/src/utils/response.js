exports.sendResponse=(res,statusCode,data,success,message,error)=>{
    return res.status(statusCode).json({
        data: data,
        success: success,
        message: message,
        err: error||{},
      })
}
