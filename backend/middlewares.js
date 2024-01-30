const jwt = require('jsonwebtoken');

const verifyUser = async(req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1] || req.Headers.authorization.split(" ")[1];
        // console.log(token);
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        console.log('form token',user); 
        next();
    } catch (error) {
        console.log('error');
        return res.status(401).json({ msg: "Unauthorized access" });
    }
}

module.exports = {verifyUser};