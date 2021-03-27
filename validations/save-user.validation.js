const validate = require("./Validation");
const {body} = require("express-validator");

const authorize = () => {
    return validate(rules());
};

const rules = () => {
    return [
        body('name').isString(),
        body('email').isString(),
        body('password').isString()
    ]
};

module.exports = authorize();
