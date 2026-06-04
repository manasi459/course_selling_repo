const{Router} = require("express");
const {userModel} = require("../db");
const userRouter = Router();
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} =  require("../config.js");
const {purchaseModel} = require("../db");
const course = require("./course.js");
const { courseModel } = require("../db");

userRouter.post("/signup" , async function(req,res){
 try {
    const {email, password, firstName , lastName}  = req.body;
    
// hash the password so the plaintext is not stored in DB
const hashedPassword = await bcrypt.hash(password , 10);

    await userModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })
    res.json({
        message: "signin succeded"
    });

} catch(err) {
    res.status(500).json({
    message : "Something went wrong",
    error : err.message
    });
}

});


userRouter.post("/signin" ,async  function(req,res){
 const {email, password} = req.body;

const user =  await userModel.findOne({
    email: email,
});

const passwordMatch = await bcrypt.compare(
    password , user.password
);

if(user){
  const token =  jwt.sign({
    id: user._id
   },JWT_USER_PASSWORD);

   res.json({
    token: token
   })
}else{
    res.status(403).json({
        message: "Incorrect credentials"
    })
}
})



userRouter.get("/purchases" , async  function(req,res){
    const userId = req.body.userId;

   const purchases =  await purchaseModel.find({
            userId
        });

        const coursesData = await courseModel.find({
            _id : { $in: purchases.map( x => x.courseId)}
        })

    res.json({
       purchases,
       coursesData
    })
}) 


module.exports = {
  userRouter : userRouter
}