const express = require("express");
const {courseRouter} = require("./routes/course");
const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(3000);