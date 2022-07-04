const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host:'db.a2deats.com',
    user:"db-stag-v2",
    password:"brRiJ6hMsdyMfY75",
    database:"db-stag-v2",
    multipleStatements: true
});



dbConn.connect(function(error){
    if(!error)
    console.log('Database Connected Successfully!!!');
    else{
        console.log("Database is not connected",error)
    }
})

module.exports = dbConn;




