const jwt = require('express-jwt');

// JWT will come in the header Authorization.
const getTokenFromHeader = (req,res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

module.exports =  jwt({
    secret: 'itexBlog', // Has to be the same that we used to sign the JWT

    userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken -> 'req.token'

    getToken: getTokenFromHeader, // A function to get the auth token from the request

    algorithms: ['HS256']
});
