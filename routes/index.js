const express = require('express'),
    router = express.Router(),
    Postage = require('../models/postage')

//INDEX
// router.get("/", (req, res) => res.redirect("/index"));
// router.get("/index", (req, res) => {
//     Postage.find({}, (err, postages) => {
//         const title = "Receitas Fitness e Lifestyle!!!";
//         if (err) {
//             console.log("log...", err);
//         } else {
//             res.render("index", { postages: { postages, title } });
//         }
//     });
// });
router.get("/", (req, res) => res.redirect("/index/1"));
router.get('/index/:page', function (req, res, next) {
    var perPage = 9
    var page = req.params.page || 1

    Postage
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, postages) {
            Postage.count().exec(function (err, count) {
                if (err) return next(err)
                const title = "Receitas Fitness e Lifestyle!!!";
                res.render('index', {
                    postages: postages,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    titlePage: title
                })
            })
        })
})

module.exports = router