const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    if(req.path.includes('auth')){
        next();
        return;
    }
    let oops = true;

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'huge secret', (errors, decodedToken)=>{
            if(!errors){
                oops = false;
                res.userid = decodedToken.id;
                next();
            }
        });
    } 

    if(oops){
        if(req.path.includes('auth'))
            next();
        else
            res.json({userid: null});
    }

    return;
}

module.exports = checkAuth;