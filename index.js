const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config()
const express = require("express");
const mongoose  = require("mongoose");
const {courseRouter} = require("./routes/course");
const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
   await mongoose.connect(process.env.MONGODB_URL)
   app.listen(3000);
   console.log("listening to port 3000");
}


main()