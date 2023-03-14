const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const pattern = /\S+@\S+\.\S+/;
  if (!pattern.test(email)) {
    return res.status(422).json({
      message: 'Invalid email',
    });
  }
  return next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(422).json({
      message: 'Password must contain at least 6 characters',
    });
  }
  return next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};