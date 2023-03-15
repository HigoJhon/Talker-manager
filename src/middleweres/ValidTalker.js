const pattern = /^\d{2}\/\d{2}\/\d{4}$/;

const talkWatchedAT = (req, res, next) => {
  const { talk } = req.body;

  if (talk.watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!pattern.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
   next();
};

const talkRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  const num = [1, 2, 3, 4, 5];
  if (!num.includes(talk.rate) || !Number.isInteger(talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const isValidtalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

module.exports = {
    talkWatchedAT,
    talkRate,
    isValidtalk,
  };