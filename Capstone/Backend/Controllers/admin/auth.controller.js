const {
    nanoid
} = require('nanoid')

const userModel = require('../../models/user.model');
const {
    generateJwtToken
} = require('../../helpers/helper');


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
                message: "Admin Email Already Exists."
            })
        }


        const _admin = new userModel({
            email,
            firstname,
            lastname,
            password,
            role: 'admin',
            username: nanoid(10),
        });

        _admin.save((error, admin) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the admin. Contact your administrator"
                });
            }
            if (admin) {

                const token = generateJwtToken(admin._id, admin.role);
                return res.json({
                    success: true,
                    message: "Admin has been successfully saved",
                    data: {
                        admin,
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
            if (data.role != 'admin') {
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden."
                });
            }

            const isAuthenticated = data.authenticate(password);
            if (isAuthenticated) {

                const token = generateJwtToken(data._id, data.role);
                return res.json({
                    success: true,
                    message: "Admin Login successfully",
                    data: {
                        user: {
                            fullname: data.fullname,
                            email: data.email
                        },
                        "token": token
                    }
                })

            } else {
                return res.json({
                    success: false,
                    message: "Admin Login failed. Bad Authentication"
                })
            }

        } else {
            return res.json({
                success: false,
                message: "Admin Email Does not exist."
            });
        }
    })

}


module.exports = {
    signup,
    signin
}