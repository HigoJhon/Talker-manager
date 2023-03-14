const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const pattern = /\S+@\S+\.\S+/;
  
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo \"email\" é obrigatório'});
  }

  if (!pattern.test(email)) {
    return res.status(400).json({ message: 'O \"email\" deve ter o formato \"email@email.com\"' });
  }
  return next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo \"password\" é obrigatório' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'O \"password\" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};