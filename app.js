const express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
const vidaLeveSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const VidaLeve = mongoose.model("Postage", vidaLeveSchema);

//Routes

//INDEX
app.get("/", (req, res) => res.redirect("/index"));
app.get("/index", (req, res) => res.render("index"));


//SERVER LISTENER
app.listen(8080, () => console.log("The server has started..."));