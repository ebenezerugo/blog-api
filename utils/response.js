
exports.send = (res, statusCode, message, type='error', data=null) => {
    const result = {
        status: type,
        message: message,
        data: data,
    };

    if (type === 'success') {
        return res.status(statusCode).json(result);
    }

    return res.status(statusCode).json({
        status: type,
        message: message,
        data: data
    });
};
