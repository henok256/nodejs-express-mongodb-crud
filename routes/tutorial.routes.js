
module.exports = app =>{
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    //create a new Tutorial
    router.post("/", tutorials.create);
    //retrieve all Tutorials
    router.get("/", tutorials.findAll);
    // retrieve all published tutorials 
    router.get("/published", tutorials.findAllPublished);

    //retrieve a single Tutorial with an id
    router.get("/:id", tutorials.findOne);
    //update a tutorial with id
    router.put("/:id", tutorials.update);

    // delete a tutorial with id
    router.delete("/:id", tutorials.delete);

    //create a new tutorial 
   
    //delete all tutorial
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};