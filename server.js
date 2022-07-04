var express = require("express")
var dbConn = require("./db")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const controLogin = require("./controllers/login")

var port = process.env.PORT || 9000;

// parse URL-encoded bodies(as send by HTML forms)
app.use(express.urlencoded({ extended: true}))
// add json bodies sent by API clients
app.use(express.json());
app.use(bodyParser.json());

const options = {
    definition: {
        openapi : "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express library API"
        },
        servers: [
            {
                url: "http://localhost:9000",
                description: 'start the server'
            }
        ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



// Define Routers
app.use("/",require("./routes/users"))
// app.use("/v1",require("./routes/login"))
app.use("/",controLogin)

app.listen(port, function(){
    console.log("listening on port ",port)
})
