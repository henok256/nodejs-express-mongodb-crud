
const db = require("../models/");
const Tutorial = db.tutorials;
// create and save a new titorials 
exports.create = (req, res) =>{
 //validate request
 if(!req.body.title){
    res.status(400).send({message: "Content can not be empty"})
    return;
}
//create a tutorial
const tutorial = new Tutorial({
    title:req.body.description,
    published: req.body.published ? req.body.published:false
});

//save tutorial in the database
tutorial
.save(tutorial)
.then(data=>{
    res.send(data);
})
.catch(err =>{
    res.status(500).send({
        message: 
        err.message || "some error occured while creating the tutorials"
    });
});
}

//retrive all tutorials from the database

exports.findAll = (req,  res)=>{
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title) , $options: "i"}}:
    Tutorial.find(condition)
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: 
            err.message || "some error occured while retrieving titorials. "
        });
    });
};

//find a single tutorial with an id
exports.findOne = (req, res)=>{
    const id = req.params.id;
    Tutorial.findById(id)
    .then(data=>{
        if(!data)
        res.status(400).send({message:"Not found Tutorial with id "+ id});
        else res.send(data);
    })
    .catch(err=>{
        res 
        .status(500)
        .send({message: "Error retrieving Tutorial with id= "+ id});
    })

};

//update a tutorial with the specified id in the request
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"Data to be updated can not be empty!"
        });
    }
const id = req.params.id;
Tutorial.findByIdUpdate(id, req.body, {useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({
            message:`Acnnot update Tutorial with id=${id}. May be Tutorial was not found! `
        });
    } else res.send({message: "Tutorial was updated successfuly."});
})
.catch(err=>{
    res.status(500).send({
        message:"Error updating Tutorial with id= " +id
    });
});
};

//Delete all tutorial from the database

exports.delete = (req, res)=>{
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: `Cannot delete Tutorial with id = ${id}. may be tutorial not found! `
            });
        } else {
            res.send({
                message:"Tutorial was deleted successfully!"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:" Couldn't delete Titorial with id=" + id
        });
    });

};

exports.deleteAll = (req, res)=>{
    Tutorial.deleteMany({})
    .then(data=>{
        res.send({
            message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while removing all tutorials. "
        });
    });
};

exports.findAllPublished = (req, res)=>{
    Tutorial.find({published:true})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving tutorials."
        });
    });
}

/*exports.create = (res, req)=>{
    //validate request
    if(!req.body.title){
        res.status(400).send({message: "Content can not be empty"})
        return;
    }
    //create a tutorial
    const tutorial = new Tutorial({
        title:req.body.description,
        published: req.body.published ? req.body.published:false
    });

    //save tutorial in the database
    tutorial
    .save(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message: 
            err.message || "some error occured while creating the tutorials"
        });
    });
};*/