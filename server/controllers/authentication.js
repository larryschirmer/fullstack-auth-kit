const User = require('../models/user');

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

    user.save(err => {
      if (err) return next(err);

      res.json({ success: true });
    });
  });
};

module.exports = { signup };
