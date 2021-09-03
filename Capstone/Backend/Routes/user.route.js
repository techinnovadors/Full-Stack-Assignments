/**
 * route  /signup
 *
 * 
 * @param 
 *  fullname
 *  email
 *  password
 *  username
 *  contactname
 * 
 *   new userModel({
 *          password  --> correct
 *          hash_password --> wrong  
 * })
 * 
 * 
 * 
 * auth.controller.js
 * 
 *    signupUser 
 *           password = bcrpyt.hashSync...
 * 
 *        new userModel({hash_password:password})
 */