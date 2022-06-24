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