const express = require('express'),
    Postage = require('../models/postage'),
    router = express.Router()

//NEW ROUTE
router.get("/index/new", (req, res) => res.render("new"));

//CREATE ROUTE  
router.post("/index", (req, res) => {
    //create blog
    Postage.create(req.body.postage)
        .then((newPostage) => res.redirect("/index"))
        .catch((error) => res.render("new"))
})

//SHOW ROUTE    
router.get("/index/:category/:id", (req, res) => {
    Postage.findById(req.params.id)
        .then(foundPostage => {
            res.render("show", { postage: foundPostage });
        })
        .catch((error) => res.redirect("/index"))
})

//EDIT ROUTE 
router.get("/index/:category/:id/edit", (req, res) => {
    Postage.findById(req.params.id)
        .then(editPostage => {
            res.render("edit", { postage: editPostage })
        })
        .catch((error) => res.redirect("/index"))
})

//UPDATE ROUTE
router.put("/index/:category/:id", (req, res) => {
    Postage.findByIdAndUpdate(req.params.id, req.body.postage)
        .then((updatedPostage) => {
            res.redirect("/index/" + req.params.category + "/" + req.params.id)
        })
        .catch(error => {
            res.redirect("/index")
        })
})

// DELETE ROUTE
router.delete("/index/:category/:id", (req, res) => {
    Postage.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect("/index")
        })
        .catch((error) => {
            res.redirect("/index")
        })
})

module.exports = router