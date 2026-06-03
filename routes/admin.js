const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel } = require("../db");
const {JWT_ADMIN_PASSWORD} =  require("../config.js");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");


adminRouter.post("/signup" ,async  function(req,res){
   try {
       const {email, password, firstName , lastName}  = req.body;
       
   // hash the password so the plaintext is not stored in DB
   const hashedPassword = await bcrypt.hash(password , 10);
   
       await adminModel.create({
           email,
           password: hashedPassword,
           firstName,
           lastName
       })
       res.json({
           message: "signup succeded"
       });
   
   } catch(err) {
       res.status(500).json({
       message : "Something went wrong",
       error : err.message
       });
   }
   
})


adminRouter.post("/signin" ,async function(req,res){
   const {email, password} = req.body;

const admin =  await adminModel.findOne({
    email: email,
});

const passwordMatch = await bcrypt.compare(
    password , admin.password
);

if(admin){
  const token =  jwt.sign({
    id: admin._id
   },JWT_ADMIN_PASSWORD);

   res.json({
    token: token
   })
}else{
    res.status(403).json({
        message: "Incorrect credentials"
    })
}
})

adminRouter.post("/course" , adminMiddleware , async function(req,res){
    const adminId = req.userId;
    const {title, description , imageUrl , price } = req.body;

   const course =  await courseModel.create({
        title, description , imageUrl , price , creatorId : adminId
    })
    res.json({
        message: "Course created",
        courseId : course._id
    })
})


adminRouter.put("/course" , adminMiddleware , async  function(req,res){
    const adminId  = req.userId;
    const { title , description , imageUrl , price , courseId } = req.body;

 const updatedCourse = await courseModel.updateOne({
   _id: courseId,
   creatorId : adminId
},
        {
            title,
            description,
            imageUrl,
            price
        }

        );
    
    res.json({
        message: "course updated"
    });
});


adminRouter.get("/course/bulk" , adminMiddleware,  async  function(req,res){
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId : adminId
    });
    res.json({
        courses
    });
});

module.exports ={
    adminRouter : adminRouter
}
