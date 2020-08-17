const express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();
    uri = "mongodb+srv://vidaleve:vidaleve@vida-leve.d9con.mongodb.net/vida_leve?retryWrites=true&w=majority"

mongoose.connect(uri || 'mongodb://localhost:27017/vida_leve', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to Atlas Mongodb!'))
    .catch(error => console.log(error.message));

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
const vidaLeveSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    category: String,
    created: { type: Date, default: Date.now }
});
//schema index for search, every objects gets 'text'
vidaLeveSchema.index({'$**': 'text'});

const VidaLeve = mongoose.model("Postage", vidaLeveSchema);
//Routes

//INDEX
app.get("/", (req, res) => res.redirect("/index"));
app.get("/index", (req, res) => {
    VidaLeve.find({}, (err, postages) => {
        const title = "Receitas Fitness e Lifestyle!!!";
        if(err) {
            console.log("log...", err);
        } else {
        res.render("index", {postages: {postages, title}});
        }  
    });
});

//NEW ROUTE
app.get("/index/new", (req, res) => res.render("new"));

//CREATE ROUTE  
app.post("/index", (req, res) => {
    //create blog
    VidaLeve.create(req.body.postage)
        .then((newPostage) => res.redirect("/index"))
        .catch((error) => res.render("new"))
})

 // fileContents.find({$or: [ {$text: { $search: request.searchtext }}, {metadata: request.meta}]},
//{ score: { $meta: "textScore" } }
//search
app.post("/index/search", (req, res) => {
      let search = req.body.search;
        VidaLeve.find({$text: {$search: search}},(err, postages) => { 
//      VidaLeve.find({$or: [{$text: {$search: search}}, {body: search}], {score: {$meta: "textScore"}}, (err, postages) => {
        const title = "Postagens encontradas";
        if(err) {
            console.log("log...", err);
        } else {
        res.render("index", {postages: {postages, title}});
        } 
   });  

});

//get given category from db
app.get("/index/:category", (req, res) => { 
    VidaLeve.find({category: { $in: [req.params.category]}}, (err, postages) => {
        const title = [req.params.category];
        if(err) {
            console.log("Categoria não encontrada", err);
        } else {
            res.render("index", {postages: {postages, title}});
        }  
    });  
});



//SHOW ROUTE    
app.get("/index/:category/:id", (req, res) => {
    VidaLeve.findById(req.params.id)
        .then(foundPostage => {
            res.render("show", {postage: foundPostage});
        })
        .catch((error) => res.redirect("/index"))
})

//EDIT ROUTE 
app.get("/index/:category/:id/edit", (req, res) => {
    VidaLeve.findById(req.params.id)
        .then(editPostage => {
            res.render("edit", {postage: editPostage})
        })
        .catch((error) => res.redirect("/index"))
}) 

//UPDATE ROUTE
app.put("/index/:category/:id", (req, res) => {
    VidaLeve.findByIdAndUpdate(req.params.id, req.body.postage)
        .then((updatedPostage) => {
            res.redirect("/index/" + req.params.category + "/" + req.params.id)
        })
        .catch(error => {
            res.redirect("/index")
        })
})

// DELETE ROUTE
app.delete("/index/:category/:id", (req, res) => {
    VidaLeve.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect("/index")
        })
        .catch((error) => {
            res.redirect("/index")
        })
})

//SERVER LISTENER
app.listen(8080, 'localhost', () => console.log("The server has started..."));