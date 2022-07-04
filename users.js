const { validateRoute } = require('../Helper/auth')
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const baseResponse = require("../Helper/DataModel/baseResponse")
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


exports.register = (req, res) => {
    // console.log(req.body);
    const { email, password} = req.body;

    if(!emailRegexp.test(req.body.email)){
        return res.send(baseResponse.withError('Please enter a valid email Id!'));
    }else if(req.body.password.length < 3){
        return res.send(baseResponse.withError('Please enter password of length 3 characters!'));}
    
    db.query('SELECT email from user_admin WHERE email = ?', [ email ], async (err, results) => {
        // console.log(results);
        if (err) {
            console.log(err);
        } 
        else {
            if (results.length > 0) {
                console.log("user already in use",req.body)
                return res.json({message: 'The email is already in use'})
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        db.query('INSERT INTO user_admin SET ?', { user_role_id:1, email: email, password: hashedPassword,token:"" }, (err, result) => {
            // console.log(result);
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    message: 'User registered successfully!!!'
                });
            }
        })
    })
}



