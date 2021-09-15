const userModel = require('../models/user.model');

signup = (req, res) => {

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
                return res.json({
                    success: true,
                    message: "User has been successfully saved",
                    data: user
                })
            }
        })
    })
}

module.exports = {
    signup
}