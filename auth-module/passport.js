// const mongoose = require('mongoose')
const userModel = require('./user.model')
const passport = require('passport');
const {con}  = require('./db-config')



passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        
        const userExists = await userModel.findOne({email:userProfile.emails[0].value})
        const id = userProfile.id
        const username = userProfile.displayName.split(' ').join('_')
        const email = userProfile.emails[0].value
        const profilePic = userProfile.photos[0].value
     
      if(!userExists){
        const data = {
          _id:id,
          username:username,
          email:email,
          profilePic:profilePic
        }

        // const sql = `INSERT INTO user(_id,username,email,profilePic) VALUES (${id},${username},${email},${profilePic})`;
        // con.query(sql, function (err, result) {  
        //   if (err) throw err;  
        //   console.log("1 record inserted");
        //   console.log(result);  
        //   });  
        const dataSaved = await userModel.create(data)
        
      }
        return done(null, userProfile);
    }
  ));
