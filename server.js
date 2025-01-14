const express = require("express")
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv")
const pageRoutes = require("./routes/pageRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",pageRoutes)
app.use("/auth",authRoutes)

//serve static files
app.use(express.static(path.join(__dirname,"public")));

//set  view engine
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
//start server

app.all('*', (req, res) => {
    res.status(404).render('error', {
      message: `The page ${req.originalUrl} you are looking for does not exist.`,
    });
  });
app.listen(process.env.PORT || 3500,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})