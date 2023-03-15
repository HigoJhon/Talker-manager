const isValidAge = (req, res, next) => {
    const { age } = req.body;
    if (age === undefined) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) <= 18 || !Number.isInteger(age)) {
      return res.status(400).json({ 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
     next();
  };

  module.exports = {
    isValidAge,
  };