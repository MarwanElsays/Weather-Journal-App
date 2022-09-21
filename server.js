// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get("/getall",(req,res)=>{
    res.send(projectData);
});

app.post("/addall",(req,res)=>{
    projectData = req.body;
    console.log(projectData);
});

const port = 4000;

const hostname = "127.0.0.1";

const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);

app.listen(port, listening);


