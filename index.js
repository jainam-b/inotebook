const connectToMongo = require("./db");
const express = require("express");
var cors=require("cors")
const path = require("path");

connectToMongo();
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("/",function(res,req){
    res.send(path.join(__dirname,"./client/build/index.html"))
});


// Available Routes
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

// app.use((req,res,next)=>{
//   res.status(404).send("page not found")
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
