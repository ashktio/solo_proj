const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
        // console.log("user not authenticated");
        res.status(401).json({ verified: false });
        } else {
        // console.log("user is authenticated");
        next();
        }
    });
};

const getIdFromToken = (req, res, next) => {
    console.log("Gets here")
    const decodedToken = jwt.decode(req.cookies.usertoken, {complete:true})

    // console.log("Decoded token new",decodedToken)

    req.user_id = decodedToken.payload.id
    next();
}
module.exports = { 
    authenticate,
    getIdFromToken
};