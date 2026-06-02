const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://manasi123:manu123@cluster1.gkye6zg.mongodb.net/coursera")
.then(()=>{
console.log("Connected");
})
.catch((err) => {
    console.log(err);
})
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const userSchema =  new Schema ({
     email : {type: String ,  unique: true},
     password : String,
     firstName : String,
     lastName : String,
})


const adminSchema = new Schema ({
    email : {type: String ,  unique: true},
     password : String,
     firstName : String,
     lastName : String,
})

const courseSchema =  new Schema ({
    title: String,
    description: String,
    price: Number,
    imageUrl : String,
    createId : ObjectId
})

const purchaseSchema =  new Schema ({
    userId : ObjectId,
    courseId : ObjectId
})
 
const userModel  = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel  = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports =  {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}