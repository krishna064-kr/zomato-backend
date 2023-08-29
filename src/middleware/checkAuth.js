const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        let token = req.headers.authorization
        if(!token) return res.status(401).json({error:'Unauthorized access'})
        token = token.split(" ")[1]
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token,process.env.JWT_SECRET);
        next();
    }
    catch(error){
        return res.status(401).json({msg:'Invalid Token'})
    }

}