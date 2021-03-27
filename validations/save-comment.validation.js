const validate = require("./validation");

const {body} = require("express-validator");

const authorize = () => {
    return validate(rules());
};

const rules = () => {
    return [
        body('postId').isString(),
        body('name').isString(),
        body('email').isString,
        body('body').not().isEmpty().trim().escape()
    ]
};

module.exports = authorize();
