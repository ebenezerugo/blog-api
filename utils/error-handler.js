module.exports = {
     logError: ({message,statusCode,data=null}) => {
        throw {
            message,
            statusCode,
            data,
            error: new Error()
        }
    }
};
