const {User} = require('../models');
const status = require( "http-status");

const AuthService = require( "./auth.service");
const errorHandler = require("../utils/error-handler");



exports.register = async (data) => {
    const {email, name, password} = data;
    let user = {};
    try {
        user = await User.findOne({email});
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }

    if(user !== null) {
        return errorHandler.logError({message: "An account already exist with this email address", statusCode: status.ALREADY_REPORTED});
    }

    try {
        const hashPassword = await AuthService.hash(data.password);
        const user = new User({email, name, password:hashPassword})
        const result = await user.save(user);
        return {email: result.email, name: result.name, password: result.password, statusCode: status.OK};
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }
}

exports.login = async (email, password) => {
    let user;
    try {
        user = await User.findOne({email});
    } catch (error) {
        return errorHandler.logError({message: error, statusCode: status.INTERNAL_SERVER_ERROR});
    }

    if (!user) {
        return errorHandler.logError({message: 'Email or password Incorrect', statusCode: status.NOT_FOUND});
    }

    const correctPassword = await AuthService.verifyHash(user.password, password);
    if (!correctPassword) {
        return errorHandler.logError({message: 'Email or password Incorrect', statusCode: status.UNAUTHORIZED});
    }

    return {
        statusCode: status.OK,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
        },
        token: AuthService.generateToken(user)
    }
}
