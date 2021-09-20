const jsonwebtoken = require('jsonwebtoken');

const generateJwtToken = (id, role) => {
    return jsonwebtoken.sign({
        id,
        role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
}

const ErrorArray = [];
ErrorArray[500] = "DB Error Occurred. Contact your administrator"
ErrorArray[400] = "Bad Request"

const getErrorResponse = (res, statusCode, message = null, error = null) => {

    return res.status(statusCode).json({
        success: false,
        message: message || ErrorArray[statusCode],
        error: error || ""
    })
}


const getResponseV1 = (res, statusCode, message = "", data = []) => {

    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    })
}


const getResponseV2 = (res, state, statusCode, message = "", data = []) => {

    return res.status(statusCode).json({
        success: state,
        message: message,
        data: data
    })
}


module.exports = {
    generateJwtToken,
    getErrorResponse,
    getResponseV1,
    getResponseV2
}