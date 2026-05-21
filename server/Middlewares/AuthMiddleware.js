
const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    
    console.log(req.headers.authorization)
   try{
      const token = req.headers.authorization.split(" ")[1] ;
      const verifiedtoken = jwt.verify(token,"aditya911")
      req.userId = verifiedtoken.userId
      req.user = verifiedtoken;

      console.log("Verified:", verifiedtoken);
      console.log("User ID from token:", req.userId);
      console.log("User info from token:", req.user);
      next()

   } catch (error){
    res.status(401).send({success : false , message: "invalid token"})
   };
   
}



