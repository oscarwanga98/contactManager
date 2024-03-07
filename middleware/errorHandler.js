const {constants}=require("../constants")

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.NOT_FOUND:
        res.json({
          title: "Not found",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.UNAUTHORIZED:
        res.json({
          title: "Unauthorized access",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation error",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.SERVER_ERROR:
        res.json({
          title: "sERVER ERROR",
          message: err.message,
          stackTrace: err.stack,
        });
      default:
        console.log('No error')
        break;
    }

    res.json({
        title:'not found',
        message:err.message, 
        stackTrace: err.stack
    })
    
}
module.exports=errorHandler