const userModel = require('../models/user.model');
const {
    generateJwtToken
} = require('../helpers/helper');



const signup = (req, res) => {

    const {
        email,
        firstname,
        lastname,
        password
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Some Error occurred while searching for existing email. Contact your administrator"
            });
        }


        if (data) {
            return res.json({
                success: false,
                message: "User Email Already Exists."
            })
        }


        const _user = new userModel({
            email,
            firstname,
            lastname,
            password,
            username: Math.random().toString(),
        });

        _user.save((error, user) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the user. Contact your administrator"
                });
            }
            if (user) {

                const token = generateJwtToken(user._id, user.role);
                return res.json({
                    success: true,
                    message: "User has been successfully saved",
                    data: {
                        user,
                        token: token
                    }
                })
            }
        })
    })
}

const signin = (req, res) => {

    const {
        email,
        password
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (data) {

            const isAuthenticated = data.authenticate(password);
            if (isAuthenticated) {

                const token = generateJwtToken(data._id);
                return res.json({
                    success: true,
                    message: "User Login successfully",
                    data: {
                        data,
                        "token": token
                    }
                })

            } else {
                return res.json({
                    success: false,
                    message: "User Login failed. Bad Authentication"
                })
            }

        } else {
            return res.json({
                success: false,
                message: "User Email Does not exist."
            });
        }
    })

}


module.exports = {
    signup,
    signin
}