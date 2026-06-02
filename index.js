const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
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
   await mongoose.connect("mongodb+srv://manasi123:manu123@cluster1.gkye6zg.mongodb.net/coursera")
   app.listen(3000);
   console.log("listening to port 3000");
}


main()