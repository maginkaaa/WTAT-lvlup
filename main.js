"use strict";

const server = require("./server.js")
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);

const passport = require("passport");
router.use(passport.initialize());
router.use(passport.session());

const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView );

create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User( getUserParams(req.body) );
    User.register(newUser, req.body.password, (error, user) => {
    if (user) {
   req.flash("success", `${user.fullName}'s account created successfully!`);
   res.locals.redirect = "/users";
   next();
    } else {
   req.flash("error", `Failed to create user account because: ${error.message}.`);
   res.locals.redirect = "/users/new";
   next();
    }
    });
}

const passport = require("passport"),
 cookieParser = require("cookie-parser"),
 expressSession = require("express-session"),
 User = require("./models/user");
router.use(cookieParser("secretCuisine123"));
router.use(expressSession({
 secret: "secretCuisine123",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})

router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);