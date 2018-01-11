const { signup, signin } = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res, next) => res.send({ message: 'ok, great' }));
  app.post('/signin', requireSignin, signin);
  app.post('/signup', signup);
};
