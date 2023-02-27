const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { UserAccount } = require('../models/userAccount');

const options = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.JWT_TOKEN,
};

module.exports = (app) => {
 app.use(passport.initialize());

 passport.use(
  new JwtStrategy(options, async (payload, done) => {
   const { _id, login } = payload;
   try {
    const user = await UserAccount.findById(_id).select({ login: true });
    if (!user) {
     return done(null, false);
    }
    return done(null, user);
   } catch (err) {
    console.error(err);
    return done(err);
   }
  })
 );
};