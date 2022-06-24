
login: (req, res) => {
    res.render("users/login");
}

authenticate: (req, res, next) => {
    User.findOne({email: req.body.email}).then(user => {
   if (user){
        user.passwordComparison(req.body.password).then(passwordsMatch =>{
        if (passwordsMatch){
            res.locals.redirect = `/users/${user._id}`;
            req.flash("success", `${user.fullName}'s logged in successfully!`);
            res.locals.user = user;
        }
        else{
            req.flash("error", "Failed to log in user account: User account not found.");
            res.locals.redirect = "/users/login";
        }
        next();
});
}else{
    req.flash("error", "Failed to log in user account: User account not found.");
    res.locals.redirect = "/users/login";
    next();
}
}).catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
    });
}

authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
})

validate: (req, res, next) => {
    req.sanitizeBody("email").normalizeEmail({
        all_lowercase: true
    }).trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("zipCode", "Zip code is invalid").notEmpty().isInt().isLength({
        min: 5,
        max: 5
    }).equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();
    req.getValidationResult().then((error) => {
        if (!error.isEmpty()) {
            let messages = error.array().map(e => e.msg);
            req.skip = true;
            req.flash("error", messages.join(" and "));
            res.locals.redirect = "/users/new";
            next();
        } else {
            next();
        }
    });
}

validate: (req, res, next) => {
    req.sanitizeBody("email").normalizeEmail({all_lowercase: true}).trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("zipCode", "Zip code is invalid").notEmpty().isInt().isLength({
    min: 5,
    max: 5
    })
    .equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();
    req.getValidationResult().then((error) => {
    if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = '/users/new';
        next();
    } else {
        next();
    }
 });
}

logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
}

login: (req, res) => {
    res.render("users/login");
}

create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
    if (user) {
   req.flash("success", `${user.fullName}'s account created successfully!`);
   res.locals.redirect = "/users";
   next();
    } else {
   req.flash("error", `Failed to create user account because: ${e.message}.`);
   res.locals.redirect = "/users/new";
   next();
    }
    });
}
