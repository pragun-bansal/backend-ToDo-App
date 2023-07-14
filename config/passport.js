// // const fs = require("fs");
// // const path = require("path");
// // const User = require("../models/User")
// // const UserService = require('./Services/UserService')

// // const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // // const JwtStrategy = require("passport-jwt").Strategy;
// // // const ExtractJwt = require("passport-jwt").ExtractJwt;


// // // const {
// // //   SecretsManagerClient,
// // //   GetSecretValueCommand
// // // } = require("@aws-sdk/client-secrets-manager");
// // const secret_name = "ID_RSA_PUBLIC_KEY";



// // // const client = new SecretsManagerClient({
// // //   region: "ap-south-1",
// // // });


// // //   try {
// // //     response = await client.send(
// // //       new GetSecretValueCommand({
// // //         SecretId: secret_name,
// // //         VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
// // //       })
// // //     );
// // //     return response.SecretString;
// // //   } catch (error) {
// // //     // For a list of exceptions thrown, see
// // //     // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// // //     throw error;
// // //   }
// // // const PUB_KEY = await f();

// // // const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
// // const PUB_KEY = process.env.ID_RSA_PUBLIC_KEY

// // // TODO
// // // const options = {
// // //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// // //   secretOrKey: PUB_KEY,
// // //   algorithm: ["RS256"],
// // // };

// // function generatePassword(length) {
// //   var password = "";
// //   var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
// //   for (var i = 0; i < length; i++) {
// //     var randomIndex = Math.floor(Math.random() * charset.length);
// //     password += charset.charAt(randomIndex);
// //   }
// //   return password;
// // }

// // // const strategy = new JwtStrategy(options, async (payload, done) => {
// // //   try {
// // //     const user = await User.findOne({
// // //       _id: payload.sub
// // //     });

// // //     if (user) {
// // //       return done(null, user);
// // //     } else {
// // //       return done(null, false);
// // //     }
// // //   } catch (error) {
// // //     return done(error, false);
// // //   }
// // // });


// // const googleStrategy = new GoogleStrategy({
// //   clientID: process.env.GOOGLE_CLIENT_ID,
// //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //   callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
// //   accessType: 'offline',
// //   prompt: 'consent'
// // }, async (acesstoken, refreshtoken, profile, done) => {
// //   const newUser = await User.findOne({
// //     email: profile.emails[0].value
// //   });
// //   let user;
// //   if (!newUser) {

// //     let name = profile.displayName;

// //     user = await UserService.registerUser({

// //       name,
// //       email: profile.emails[0].value,
// //       password: generatePassword(16),

// //     })

// //   } else {
// //     user = newUser;
// //   }

// //   done(null,
// //     user
// //   );

// // })


// // // TODO
// // module.exports = (passport) => {
// //   passport.use(strategy);
// //   passport.use(googleStrategy);
// // };



// require("dotenv").config()
// const User = require("../models/User")
// const UserService = require('./Services/UserService')
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// // const GithubStrategy = require("passport-github2").Strategy;
// // const FacebookStrategy = require("passport-facebook").Strategy;
// const passport = require("passport");

// function generatePassword(length) {
//   var password = "";
//   var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   for (var i = 0; i < length; i++) {
//     var randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset.charAt(randomIndex);
//   }
//   return password;
// }

// // const GOOGLE_CLIENT_ID =
// //   "your id";
// // const GOOGLE_CLIENT_SECRET = "your id";

// // GITHUB_CLIENT_ID = "your id";
// // GITHUB_CLIENT_SECRET = "your id";

// // FACEBOOK_APP_ID = "your id";
// // FACEBOOK_APP_SECRET = "your id";

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //      clientID: process.env.GOOGLE_CLIENT_ID,
// //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //   callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
// //     },
// //     async function (accessToken, refreshToken, profile, done) {
// //       // console.log(profile);
// //       const newUser =await User.findOne({
// //             email: profile.emails[0].value
// //           });
// //           // console.log(newUser);
// //           let user;
// //           if (!newUser) {
// //             // console.log("new user")
// //             let name = profile.displayName;
        
// //             user =  UserService.registerUser({
        
// //               name,
// //               email: profile.emails[0].value,
// //               password: generatePassword(16),
        
// //             })
        
// //           } else {
// //             // console.log("not a new user");
// //             user = newUser;
// //           }
        
// //           done(null,
// //             profile
// //           );
// //     }
// //   )
// // );

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         const newUser = await User.findOne({ email: profile.emails[0].value });

//         let user;

//         if (!newUser) {
//           let name = profile.displayName;

//           // Register the new user
//           user = await UserService.registerUser({
//             name,
//             email: profile.emails[0].value,
//             password: generatePassword(16),
//           });
//         } else {
//           user = newUser;
//         }

//         done(null, profile);
//       } catch (err) {
//         done(err); // Pass the error to the done function
//       }
//     }
//   )
// );


// // passport.use(
// //   new GithubStrategy(
// //     {
// //       clientID: GITHUB_CLIENT_ID,
// //       clientSecret: GITHUB_CLIENT_SECRET,
// //       callbackURL: "/auth/github/callback",
// //     },
// //     function (accessToken, refreshToken, profile, done) {
// //       done(null, profile);
// //     }
// //   )
// // );

// // passport.use(
// //   new FacebookStrategy(
// //     {
// //       clientID: FACEBOOK_APP_ID,
// //       clientSecret: FACEBOOK_APP_SECRET,
// //       callbackURL: "/auth/facebook/callback",
// //     },
// //     function (accessToken, refreshToken, profile, done) {
// //       done(null, profile);
// //     }
// //   )
// // );

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((user, done) => {
// //   done(null, user);
// // });

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });


require("dotenv").config();
const User = require("../models/User");
const UserService = require("./Services/UserService");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

function generatePassword(length) {
  var password = "";
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const newUser = await User.findOne({ email: profile.emails[0].value });
        let user;
        if (!newUser) {
          let name = profile.displayName;

          // Register the new user
          user = await UserService.registerUser({
            name,
            email: profile.emails[0].value,
            password: generatePassword(16),
            pfp: profile.photos[0].value,
          });
        } else {
          user = newUser;
        }
        done(null, user);
      } catch (err) {
        console.log("google strategy m error de diya h");
        done(err);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("profile" , profile);
        const newUser = await User.findOne({ email: profile.emails[0].value });
        let user;

        if (!newUser) {
          let name = profile.displayName;

          // Register the new user
          user = await UserService.registerUser({
            name,
            email: profile.emails[0].value,
            password: generatePassword(16),
            pfp: profile.photos[0].value,
          });
        } else {
          user = newUser;
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.GITHUB_CLIENT_CALLBACK_URL,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         console.log(profile);
//         const newUser = await User.findOne({ email: profile.emails[0].value });
//         let user;

//         if (!newUser) {
//           let name = profile.displayName;

//           // Register the new user
//           user = await UserService.registerUser({
//             name,
//             email: profile.emails[0].value,
//             password: generatePassword(16),
//             pfp: profile.photos[0].value,
//           });
//         } else {
//           user = newUser;
//         }

//         done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
