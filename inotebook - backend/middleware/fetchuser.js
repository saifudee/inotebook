const jwt = require('jsonwebtoken');
const JWT_SERECT = "Hello"

const fetchuser = (req,res,next)=>{
       const token = req.header('auth-token')
       if(!token){
       return res.status(401).json({ error: "Please authenicate the vaild token" });
       }
    try {
       const data = jwt.verify(token,JWT_SERECT)
       req.user = data.user
       next();
   } catch (error) {
    res.status(400).send({ error:"Please authenicate the vaild token"})
   }
}

module.exports = fetchuser;