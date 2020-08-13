const express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

mongoose.connect('mongodb://localhost:27017/vida_leve', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
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
const VidaLeve = mongoose.model("Postage", vidaLeveSchema);

//Routes

//INDEX
app.get("/", (req, res) => res.redirect("/index"));
app.get("/index", (req, res) => {
    VidaLeve.find({}, (err, postages) => {
        if(err) {
            console.log("log...", err);
        } else {
        res.render("index", {postages: postages});
        }  
    });
});

// NEW ROUTE
app.get("/index/new", (req, res) => res.render("new"));

//CREATE ROUTE  
app.post("/index", (req, res) => {
    //create blog
    VidaLeve.create(req.body.postage)
        .then((newPostage) => res.redirect("/index"))
        .catch((error) => res.render("new"))
})

//SERVER LISTENER
app.listen(8080, 'localhost', () => console.log("The server has started..."));