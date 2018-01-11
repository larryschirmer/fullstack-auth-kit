const passport = require('passport');
const User = require('../models/user');
const config = require('../../config');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, ({ sub }, done) => {
  User.findById(sub, (err, user) => {
    if (err) return done(err, false);

    user ? done(null, user) : done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
