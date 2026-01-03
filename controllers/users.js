const User = require("../Models/user");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            const redirectUrl = res.locals.redirectUrl || "/listings";
            delete req.session.redirectUrl;   //  REQUIRED
            res.redirect(redirectUrl);
        })
    
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async(req,res) => {
    req.flash("success","Welcome back to WanderLust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;   //  REQUIRED
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged Out!");
        res.redirect("/listings");
    })
};