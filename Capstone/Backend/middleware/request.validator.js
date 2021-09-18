const {
    check,
    validationResult
} = require('express-validator');

const validateSignUpRequest = [
    check('firstname').notEmpty().withMessage("First Name is required"),
    check('lastname').notEmpty().withMessage("Last Name is required"),
    check('email').isEmail().withMessage("Validate Email is required"),
    check('password').isLength({
        min: 6
    }).withMessage("Password Min Length Should be 6 characters"),
]

const validateSignInRequest = [
    check('email').isEmail().withMessage("Validate Email is required"),
    check('password').isLength({
        min: 6
    }).withMessage("Password Min Length Should be 6 characters"),
]


const validateCreateCategoryRequest = [
    check('name').notEmpty().withMessage("Category Name is required")
]


// const validateCreateProductRequest = [
//     check('name').notEmpty().withMessage("Category Name is required"),
//     check('price')
// ]


const isRequestCorrect = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (errors.array().length > 0) {

        return res.status(400).json({
            success: false,
            message: "Invalid Request",
            errors: errors.array()[0].msg
        })
    }
    next();
}

module.exports = {
    validateSignUpRequest,
    validateSignInRequest,
    validateCreateCategoryRequest,
    isRequestCorrect,
}