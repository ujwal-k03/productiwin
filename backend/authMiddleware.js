const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    if(req.path.includes('auth')){
        next();
        return;
    }

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'huge secret', (errors, decodedToken)=>{
            if(errors)
                res.json({userid: null});
            else{
                res.userid = decodedToken.id;
                next();
            }
        });
    } else
        res.json({userid: null});
}

module.exports = checkAuth;