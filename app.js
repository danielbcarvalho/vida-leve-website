const express = require("express"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  uri = process.env.DATABASEURL,
  Postage = require("./models/postage"),
  indexRouter = require("./routes/index"),
  searchRouter = require("./routes/search"),
  postagesRouter = require("./routes/postages");

const app = express();

mongoose
  .connect(uri || "mongodb://localhost:27017/vida_leve", {
    // .connect(
    //   uri ||
    //     "mongodb+srv://vidaleve:vidaleve@vida-leve.d9con.mongodb.net/vida_leve?retryWrites=true&w=majority",
    //  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Atlas Mongodb!"))
  .catch((error) => console.log(error.message));

//** Newsletter */
//import mailchimp from "@mailchimp/mailchimp_marketing";

// mailchimp.setConfig({
//   apiKey: "cd3090dd888347c9805ed6cab7bf4146-us2",
//   server: "us2",
// });

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//APP ROUTES
app.use(indexRouter);
app.use(postagesRouter);
app.use(searchRouter);

//SERVER LISTENER
app.listen(3000, () => console.log("The server has started..."));
