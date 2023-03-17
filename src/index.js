const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const { join } = require('path');
const { isValidEmail, isValidPassword } = require('./middleweres/validator');
const { isValidtoken } = require('./middleweres/validToken');
const { isValidName } = require('./middleweres/validName');
const { isValidAge } = require('./middleweres/validAge');
const { isValidtalk, talkRate, talkWatchedAT } = require('./middleweres/ValidTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkerRoute = './talker.json';

app.get('/talker', async (req, res) => {
  const talker = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talker);
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/search', isValidtoken, async (req, res) => {
  const { q } = req.query;
  const talkers = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talkers);
  console.log(data);
  const resul = data.filter((a) => a.name.includes(q));
  console.log(resul);
  res.status(200).json(resul);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talker);
  const resul = data.find((a) => a.id === +id);
  if (resul) {
    return res.status(HTTP_OK_STATUS).json(resul);
  }

  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  res.status(HTTP_OK_STATUS).json({
    token: crypto.randomBytes(8).toString('hex'),
  });
});

app.post('/talker', isValidtoken, isValidName, isValidAge, isValidtalk,
talkWatchedAT, talkRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talkers);

  const resul = { id: data.length + 1, name, age, talk };

  data.push(resul);
  await fs.writeFile(join(__dirname, talkerRoute), JSON.stringify(data));
  res.status(201).json(resul);
});

app.put('/talker/:id', isValidtoken, isValidName, isValidAge, isValidtalk,
talkWatchedAT, talkRate, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talkers);
  const resp = data.filter((dat) => dat.id !== +id);
  
  if (resp.length === data.length) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  
  const resul = { id: +id, ...req.body };

  resp.push(resul);
  await fs.writeFile(join(__dirname, talkerRoute), JSON.stringify(resp));

  return res.status(200).json(resul);
});

app.delete('/talker/:id', isValidtoken, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talkers);

  const resul = data.filter((a) => a.id !== +id);
  await fs.writeFile(path.resolve(__dirname, talkerRoute), JSON.stringify(resul, null, 2));
  res.status(204).json();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
