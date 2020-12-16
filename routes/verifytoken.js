const jwt = require('jsonwebtoken');

function auth (req,res,next) {
    const token =  req.header('auth-token')
    if (!token) return res.status(401).send('access denied : need to log-in');

    secret = "yooohoooo"

    try{
        const verified = jwt.verify(token,secret);
        req.user = verified
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth