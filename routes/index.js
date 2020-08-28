const express = require('express'),
    router = express.Router(),
    Postage = require('../models/postage')

//INDEX
router.get("/", (req, res) => res.redirect("/index"));
router.get("/index", (req, res) => {
    Postage.find({}, (err, postages) => {
        const title = "Receitas Fitness e Lifestyle!!!";
        if (err) {
            console.log("log...", err);
        } else {
            res.render("index", { postages: { postages, title } });
        }
    });
});

module.exports = router