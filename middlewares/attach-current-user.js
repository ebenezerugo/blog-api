const {User} = require('../models');

module.exports =  async (req, res, next) => {
    const decodedTokenData = req.token.data;
    const userRecord = await User.findById(decodedTokenData.id);

    req.currentUser = userRecord;

    if(!userRecord) {
        return res.status(401).json({error: 'User not found'});
    } else {
        return next();
    }
};
