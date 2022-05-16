const express = require("express");
const cors = require("cors");
const app= express();
const db = require("./models");
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("connected to the database!");
})
.catch(err=>{
    console.log("Cannot connect to the database", err);
    process.exit();
})
var corsOptions = {
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));
//parse requests of content-type -application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//simple route
app.get("/", (req, res)=>{
    res.json({Message:"Welcome to Henok Application"});
});

//set port, listen for requests
require("./routes/tutorial.routes.js")(app)
const port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}.`);
});

