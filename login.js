const dbConn = require("../db")
const {getUserByUserEmail} = require("./users")
const bcrypt = require("bcryptjs")
const { sign } = require("jsonwebtoken");
const express = require("express")
const Router = express.Router();

Router.post("/login",exports.login = async (req, res) => {
    try {
        const { status,email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please Provide an email and password"
            })
        }
        
        dbConn.query('SELECT * FROM user_admin WHERE email = ?', [email], async (err, results) => {
            console.log(results);
            // console.log(results[0].password)
            try{
                if (typeof results === undefined){
                    res.send("user do not exist");
                }
                else{
                const cmp = await bcrypt.compare(req.body.password, results[0].password);
                if(cmp){
                    const id = results[0].id;
    
                    results.password = undefined;
                    const jsontoken = sign({ authentication: email }, "qwe1234", {
                        expiresIn: "1h"
                    });

                    if (status === 1){
                        dbConn.query("UPDATE user_admin SET token=?,status=? WHERE email = ?", [jsontoken,status,email], (err, results)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    success: 1,
                                    message: "login successfully",
                                    token: jsontoken
                                });
                            }
                        })

                    }
                    // const {status} = req.body;
                    else{
                        dbConn.query("UPDATE user_admin SET token=?,status=? WHERE email = ?", ["",status,email], (err, results)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    success: 0,
                                    message: "signout successfully",
                                    token: ""
                                });
                            }
                        })
                    }
                   
                }
     
                else {
                    res.status(401).json({
                        message: "passwords are not matching"
                    })  
                }
                }
                

            }catch(err){
                res.send("please try to signup")
                // console.log(err);
                // console.log("user have no email id registered yet")
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// exports.login = async (req, res) => {
//     try {
//         const { status,email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Please Provide an email and password"
//             })
//         }
        
//         dbConn.query('SELECT * FROM user_admin WHERE email = ?', [email], async (err, results) => {
//             console.log(results);
//             // console.log(results[0].password)
//             try{
//                 if (typeof results === undefined){
//                     res.send("user do not exist");
//                 }
//                 else{
//                 const cmp = await bcrypt.compare(req.body.password, results[0].password);
//                 if(cmp){
//                     const id = results[0].id;
    
//                     results.password = undefined;
//                     const jsontoken = sign({ authentication: email }, "qwe1234", {
//                         expiresIn: "1h"
//                     });

//                     if (status === 1){
//                         dbConn.query("UPDATE user_admin SET token=?,status=? WHERE email = ?", [jsontoken,status,email], (err, results)=>{
//                             if (err) {
//                                 console.log(err);
//                             } else {
//                                 return res.json({
//                                     success: 1,
//                                     message: "login successfully",
//                                     token: jsontoken
//                                 });
//                             }
//                         })

//                     }
//                     // const {status} = req.body;
//                     else{
//                         dbConn.query("UPDATE user_admin SET token=?,status=? WHERE email = ?", ["",status,email], (err, results)=>{
//                             if (err) {
//                                 console.log(err);
//                             } else {
//                                 return res.json({
//                                     success: 0,
//                                     message: "signout successfully",
//                                     token: ""
//                                 });
//                             }
//                         })
//                     }
                   
//                 }
     
//                 else {
//                     res.status(401).json({
//                         message: "passwords are not matching"
//                     })  
//                 }
//                 }
                

//             }catch(err){
//                 res.send("please try to signup")
//                 // console.log(err);
//                 // console.log("user have no email id registered yet")
//             }
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }

Router.put('/change/password/:email', (req, res) => {
    try{
        const {password} = req.body;
        const hash = bcrypt.hashSync(password,10)
        db.query("UPDATE user_admin SET password WHERE email = ?", [hash,email], (err, result) => {
            if(err){
                res.status(400).send(err.message)
                console.log(err);
                return;
            }else{
                res.status(200).send(baseResponse.withSuccess('Your password has been changed!'))
                console.log(result)
                console.log("Your data has been changed successfully");
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send(baseResponse.withError(''));
    }
});

module.exports = Router;