
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const passportSetup = require("./config/passport");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const authRoute = require("./config/auth");
// const morgan = require("morgan")

// const routes = require("./routes/ToDoRoute");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5005;

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use("/auth", authRoute);

// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["Pragun"],
//         maxAge: 24 * 60 * 60 * 1000,
//     })
// );
// app.use(morgan("dev"));
// app.use(express.json());


// // app.use(passportSetup);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req, res, next) => {
//   console.log("User:", req.user); // Accessing req.user in middleware
//   next();
// });

// // app.use(
// //   cors({
// //     origin: "*",
// //     methods: "GET, PUT, POST, DELETE",
// //     credentials: true,
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err));

// app.use(routes);

// app.listen(PORT, () => {
//   console.log(`Server is connected on port: ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
require('./config/passport.js')
const cookieSession = require("cookie-session");
const authRoute = require("./config/auth");
const morgan = require("morgan");
const path = require('path');
const routes = require("./routes/ToDoRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({ origin: `${process.env.FRONT_END_URL}`, credentials: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["Pragun"],
    maxAge: 24 * 60 * 60 * 1000,
    // secure:true
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("User:", req.user); // Accessing req.user in middleware
  next();
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// //   app.get("*", (req, res) => {
// //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// //   });
// }


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is connected on port: ${PORT}`);
});
