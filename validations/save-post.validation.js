const validate = require("./validation");
const {body} = require("express-validator");

const authorize = () => {
    return validate(rules());
};

const rules = () => {
    return [
        body('userId').isString(),
        body('title').not().isEmpty().trim().escape(),
        body('body').not().isEmpty().trim().escape()
    ]
};

module.exports = authorize();
