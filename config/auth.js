const router = require("express").Router();
// const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserService = require("./Services/UserService")
const {
  validateLoginInput
} = require("./../validation/login");
const {validateRegisterInput} =require("./../validation/register")


const CLIENT_URL = `${process.env.FRONT_END_URL}`;


// router.post("/login",async(req,res)=>{
//   const user = req.body;
//   console.log(user)
//       jwt.sign({user},process.env.JWT_SECRET_KEY,{expiresIn:'1d'},async(err,token)=>{
//         const check = await User.findOne({email:user.email});
//         if(check){
//         res.status(200).json({
//           success:true,
//           message:"token Generated",
//           token,
//           user:req.body
//         })}
//         else{
//           res.status(400).json({
//             success:false,
//             message:"User not found"
//           })
//         }
//       })
// })


router.post("/login", async (req, res) => {
  try {
    const {
      errors,
      isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    const token = await UserService.loginUser(email, password);
    
    if (!token) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Email or password not valid"
        });
    } else {
      const user = await User.findOne({email:email})
      res.json({
        success: true,
        message: "Login Successfull",
        user:user,
        token: token.token,
        expiresIn: token.expires,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error: " + error,
      success: false
    });
  }
});


router.post("/register",async(req,res)=>{

  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const userDetails = req.body;
  const newUser = await User.findOne({ email: userDetails.email });
        let user;
        if (!newUser) {
          try{
          

          // Register the new user

          user = await UserService.registerUser({
            name:userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
            // pfp: profile.photos[0].value,
          });
          }
          catch(err){
            res.status(400).json(
              err,
              message="user Can't be created"
            )
          }
          
        } else {
          user = newUser;
        }
  const response = user;
  res.send(response);
      
})

// router.get("/login/success", (req, res) => {
//   console.log(req.session);
//     if (req.user) {
//       console.log("User available");
//       res.status(200).json({
//         success: true,
//         message: "Authentication successful",
//         user: req.user,
//         // cookies: req.cookies
//       });
//     } else {
//       console.log("User unavailable");
//     //   console.log(res);
//       res.status(401).json({
//         success: false,
//         message: "User not authenticated"
//       });
//     }
//   });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(CLIENT_URL);
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//       successRedirect: CLIENT_URL,
//       failureRedirect: "/login/failed",
//     }),
//     (err, req, res, next) => {
//       console.log("ENTERED");
//       req.session.user = req.user;
//       console.log("req.session.user",req.session.user);
//       console.log("req.user",req.user);
//       if (err) {
//         // Handle the error

//         console.log("Authentication failed:", err);
//         return res.status(500).json({
//           success: false,
//           message: "Authentication failed",
//           error: err.message,
//         });
//       }
  
//       // Authentication succeeded
//       // Redirect or send a response indicating success
//       res.redirect(CLIENT_URL);
//     }
//   );

// router.get("/github", passport.authenticate("github", { scope: ["profile","email"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   }),
//   (err, req, res, next) => {
//     // req.session.user = req.user;
//     if (err) {
//       // Handle the error

//       console.log("Authentication failed:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Authentication failed",
//         error: err.message,
//       });
//     }

//     // Authentication succeeded
//     // Redirect or send a response indicating success
//     res.redirect("github.com");
//   }
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile","email"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   }),
// (err, req, res, next) => {
//   req.session.user = req.user;
//   if (err) {
//     // Handle the error

//     console.log("Authentication failed:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Authentication failed",
//       error: err.message,
//     });
//   }

//   // Authentication succeeded
//   // Redirect or send a response indicating success
//   res.redirect("github.com");
// }
// );

module.exports = router