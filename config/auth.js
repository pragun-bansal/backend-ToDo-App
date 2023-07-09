const router = require("express").Router();
const passport = require("passport");


const CLIENT_URL = `${process.env.FRONT_END_URL}`;

router.get("/login/success", (req, res) => {
  // console.log(req);
    if (req.user) {
      console.log("User available");
      res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: req.user,
        // cookies: req.cookies
      });
    } else {
      console.log("User unavailable");
    //   console.log(res);
      res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
  });

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    }),
    (err, req, res, next) => {
      req.session.user = req.user;
      if (err) {
        // Handle the error

        console.log("Authentication failed:", err);
        return res.status(500).json({
          success: false,
          message: "Authentication failed",
          error: err.message,
        });
      }
  
      // Authentication succeeded
      // Redirect or send a response indicating success
      res.redirect("google.com");
    }
  );

router.get("/github", passport.authenticate("github", { scope: ["profile","email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (err, req, res, next) => {
    req.session.user = req.user;
    if (err) {
      // Handle the error

      console.log("Authentication failed:", err);
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: err.message,
      });
    }

    // Authentication succeeded
    // Redirect or send a response indicating success
    res.redirect("github.com");
  }
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile","email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
(err, req, res, next) => {
  req.session.user = req.user;
  if (err) {
    // Handle the error

    console.log("Authentication failed:", err);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: err.message,
    });
  }

  // Authentication succeeded
  // Redirect or send a response indicating success
  res.redirect("github.com");
}
);

module.exports = router