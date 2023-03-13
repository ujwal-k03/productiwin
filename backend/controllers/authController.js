const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
    let errors = {
        email: '',
        password: ''
    }

    if(err.code === 11000) {
        errors.email = "That email already exists";
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'huge secret', {
        expiresIn: maxAge
    });
}
// new user
const signupUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000});
        await res.status(201).json({userid: user._id, email: user.email});

    } catch (err) {
        const errors = handleErrors(err);
        await res.status(400).json({errors, userid: null, email: null});
    }
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(200).json({userid: user._id, email: user.email});

    } catch (err) {
        const errors = {
            error: err.message
        }
        res.status(400).json({errors, userid: null, email: null});
    }
}

const getDetails = async (req, res) => {
    
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'huge secret', async (errors, decodedToken) => {
            if(!errors) {
                const user = await User.findById(decodedToken.id).exec();
                res.json({userid: user._id, email: user.email});
            }
            else
                res.json({userid: null, email: null});
        });
    } else 
        res.json({userid: null, email: null});
}

// logout user
const logoutUser = (req, res) => {
    res.json({
        message: "logged out"
    })
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    getDetails,
}