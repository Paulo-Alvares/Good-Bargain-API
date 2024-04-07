const { knex } = require("./database");

exports.rotas = (app) => {
  app.get("/", function (req, res) {
    return res.status(200).send("API funcionando, Párabens!!!");
  });

  app.get("/cliente", function (req, res) {
    knex('clientes').select().then((clientes) => {
        return res.status(200).send(clientes);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  });

  app.get("/cliente/:id", async function (req, res) {
    const id = Number(req.params.id);
    const cliente = await knex('clientes').select().where({ id }).first();
    return res.status(200).send(cliente);
  });

  app.post("/cliente", async function (req, res) {
    const cliente = await knex("clientes").insert(req.body).returning("*");
    return res.status(200).send(cliente);
  });

  app.put("/cliente/:id", async function (req, res) {
    const id = Number(req.params.id);
    await knex('clientes').where({id}).update(req.body);
    return res.status(200).json('Cliente editado com sucesso');
  });

  app.delete("/cliente/:id", async function (req, res) {
    const id = Number(req.params.id);
    await knex('clientes').where({id}).del();
    return res.status(200).json('Cliente removido com sucesso');
  });
};
