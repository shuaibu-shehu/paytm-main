const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {

    try {
        const token = req.cookies['token'];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
}

module.exports = {verifyUser};