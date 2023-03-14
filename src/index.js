const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkerRoute = './talker.json'

app.get('/talker', async (req, res) => {
  const talker = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talker);
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(path.resolve(__dirname, talkerRoute));
  const data = JSON.parse(talker);
  const resul = data.find((a) => a.id === +id);
  if (resul) {
    return res.status(HTTP_OK_STATUS).json(resul);
  };
  return res.status(404).json({
    message: "Pessoa palestrante não encontrada"
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
