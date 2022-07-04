const RestaurentModel = require("../models/Restaurent")
const express = require("express")
const router = express.Router();
const dbConn = require("../db");
const auth = require("../middleware/validation")


router.post('/api/user/admin/restaurant/create-restaurant',auth,async(req,res)=>{
    try {
        const finalresult = {};
        var cafedetail = false;
        var cafecontact = false;
        var cafelist  = false;
        if(req.body.name == undefined || req.body.city == undefined || req.body.email_id == undefined ){
            return helper.baseResponse.sendError(res, {}, 'All Fields are Mandatory!', 403);
        }

        // For cafe details
        const newCafe = new cafeDetailsModel({
            "name":req.body.name
        })

         await newCafe.save().then((result)=>{
             cafedetail = true
             finalresult.cafe_id = result._id
         }).catch((error)=>{
             console.log(error);
         })



         // For cafe contact
         db.query('INSERT INTO user_admin SET ?', { user_role_id:1, email: email, password: hashedPassword,token:"" }, (err, result) => {
            // try{}
         })

        //  const details1 = new cafeContactModel({
        //     "cafe_id" : finalresult.cafe_id,
        //     "email":req.body.email_id,
        //     "city":req.body.city
        // })

        //  await details1.save().then((result)=>{
        //     cafecontact = true
        //     finalresult.city = result.city
        //     finalresult.email_id = result.email

        // }).catch((error)=>{
        //     console.log(error)
           
        // })




        // For cafe list
        db.query('INSERT INTO user_admin SET ?', { user_role_id:1, email: email, password: hashedPassword,token:"" }, (err, result) => {

        })

        // const details2 = new cafeListModel({
        //     "cafe_id" : finalresult.cafe_id,
        //     "status":true
        // })

        // await details2.save().then((result)=>{
        //     cafelist = true
        
        // }).catch((error)=>{
        //     console.log(error)
        // })


        if(cafedetail!=true && cafecontact!=true && cafelist!=true ){
            return helper.baseResponse.sendError(res, {}, 'Error in creating restaurant!', 502);
        }else{
            return helper.baseResponse.sendSuccess(res, finalresult, 'Restaurant Added Successfully');
        }

    } catch (error) {
        console.log(error);
    }
})



// router.post("/admin/create-restaurant",auth,(req,res) => {
//     let { name, city, email} = req.body;
//     // var sql = "SET @EmpID = ?; SET @Name = ?;SET @EmpCode = ?; SET @salary = ?; \
//     // CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
//     // dbConn.query(sql, [emp, [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err ,rows, fields) => {
//     db.query('INSERT INTO Restaurant SET ?', { name: name, city: city, email: email }, (err, results) => {

//         if(!err){
//             console.log("one row inserted successfully",results)
//             // res.send("successfully inserted the data",results)
//             return res.json({
//                 message: 'data entered in db successfully!!!'
//             });
//             // rows.forEach(element => {
//             //     if(element.constructor == Array)
//             //     res.send("Inserted restaurent Id: "+element[0].empID);
//             // });
//         }
//         else{
//             console.log(err)
//         }
//     })
// });

module.exports = router;