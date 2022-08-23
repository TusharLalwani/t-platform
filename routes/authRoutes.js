const passport = require("passport");

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.send("You have been logged in successfully..." + req.user.googleUserName);
        }
    );

    //To view which is the present user on the particular session
    app.get(
        '/api/current_user', (req,res) => {
            //Session will consists of only id from mongodb and not the googleid.
            res.send(req.session );
            // res.send(req.user);
        }
    );

    // logging out session from the storage
    app.get(
        '/api/logout', (req,res) => {
            const logout = req.user;
            req.logout();
            res.send("You have been logged out successfully..." + logout.googleUserName);
        }
    );
}