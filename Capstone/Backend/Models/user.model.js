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
        enum: ["user", "admin", "super-admin"]
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
 * 
 * Virtuals are properties not stored in the database.
 * They are only logically stored to perform computations on the document fields.
 */

userSchema.virtual('password').set((password) => {
    this.hash_password = bcrypt.hashSync(password, 100)
})

userSchema.virtual('fullname').get(() => {
    return this.firstname + ' ' + this.lastname;
}).set((fullname) => {
    this.firstname = fullname.split(' ')[0];
    this.lastname = fullname.split(' ')[1];
})



module.exports = mongoose.model('User', userSchema);