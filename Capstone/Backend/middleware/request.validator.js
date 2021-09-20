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

/**
 * ---Difficult----
 * custom validator
 * 
 * https://stackoverflow.com/questions/37339479/express-validator-to-validate-parameter-which-is-an-array
 * https://express-validator.github.io/docs/custom-validators-sanitizers.html#example-converting-to-mongodbs-objectid
 * */ 
const validateAddToCartRequest = [
    check('cartItems').notEmpty().withMessage("Please add one or more items to the cart")
]


const isRequestCorrect = (req, res, next) => {
    const errors = validationResult(req);
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
    validateAddToCartRequest,
    isRequestCorrect,
}