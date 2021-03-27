const userService = require('../services/user.service');
const response = require("../utils/response");


exports.register = async (req, res) => {
    try {
        const {name, email, statusCode} = await userService.register(req.body);
        return response.send(res, statusCode, 'Registration successful!', 'success',{name,email});
    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
}


exports.login = async (req, res) => {
    const {email,password} = req.body;
    try {
        const {statusCode, user, token} = await userService.login(email,password);
        return response.send(res, statusCode, 'Login successful', 'success',{user,token});
    } catch (error) {
        return response.send(res, error.statusCode, error.message, 'error', error.data);
    }
};
