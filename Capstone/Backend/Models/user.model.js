const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


/**
 * 
 * User Schema 
 *  
 * @attributes
 *  firstname
 *  lastname
 *  email
 *  contact_number
 *  hash_password
 *  username
 *  role/type
 * 
 */

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide your FirstName"],
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: [true, "Please provide your LastName"],
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        trim: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, "Please provide your Username"],
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user"
    },
    contact_number: {
        type: String
    },
    hash_password: {
        type: String,
        required: [true, "Please provide your Password"],
    }
}, {
    timestamps: true
})


/**
 * Virtuals are properties not stored in the database.
 * They are only logically stored to perform computations on the document fields.
 *
 */

/**
 * 
 *    client --> node server  [ server.js <--> route <--> controllers <--> model, save data to db   ]
 *    
 *    sending data to db , it will check for the virtuals
 * 
 * 
 *    what will be the scope of the 'this' keyword? what will it contain / refer to ?
 * 
 * 
 *    anonymous functions 
 *    arrow functions -> the hash_password property of the const variable userSchema will be overwritten
 *    general functions
 */


userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 12)
})

userSchema.virtual('fullname').get(function () {
    return this.firstname + ' ' + this.lastname;
}).set(function (fullname) {
    this.firstname = fullname.split(' ')[0];
    this.lastname = fullname.split(' ')[1];
})


/***
 * 
 * Methods / Functions that are generic and assoicated to a particular Model 
 * 
 */

userSchema.methods = {

    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }

}

module.exports = mongoose.model('User', userSchema);