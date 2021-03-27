const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY

exports.verifyHash = async (hash, text) => {

    return argon2.verify(hash, text)

}

exports.hash = (value) => {

    return argon2.hash(value)

}

exports.sign = (data, options) => {

    return jwt.sign(data, SECRET_KEY, options)

}

exports.generateToken = (user) => {

    const data =  {
        id: user.id,
        email: user.email
    };
    const signature = 'itexBlog';
    const expiration = '6h';

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
}
