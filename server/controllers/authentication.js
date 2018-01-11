const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: 'Missing data: no email or password was provided' });

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: 'Email is in use' });

    const user = new User({
      email,
      password,
    });

    user.save().then(doc => {
      if (!doc) return next('could not save user information');

      res.json({ token: tokenForUser(user) });
    });
  });
};

const signin = (req, res, next) => {
  const { user } = req;
  res.send({ token: tokenForUser(user) });
};

module.exports = { signup, signin };
