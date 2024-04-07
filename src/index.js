const express = require("express");
const { rotas } = require("./rotas");

const app = express();

app.use(express.json());

rotas(app);

app.listen(3000, () => {
  console.log("Servidor rodando na porta: http://localhost:3000");
});
