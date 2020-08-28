const express = require('express'),
    router = express.Router(),
    Postage = require('../models/postage')

//search
router.post("/index/search", (req, res) => {
    let search = req.body.search;
    Postage.find({ $text: { $search: search } }, (err, postages) => {
        const title = "Postagens encontradas";
        if (err) {
            console.log("log...", err);
        } else {
            res.render("index", { postages: { postages, title } });
        }
    });

});

//get given category from db
router.get("/index/:category", (req, res) => {
    Postage.find({ category: { $in: [req.params.category] } }, (err, postages) => {
        const title = [req.params.category];
        if (err) {
            console.log("Categoria não encontrada", err);
        } else {
            res.render("index", { postages: { postages, title } });
        }
    });
});

module.exports = router