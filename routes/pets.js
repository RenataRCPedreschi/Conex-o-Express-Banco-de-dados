const Cliente = require("../database/cliente");
const Pet = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

//Mapeamento de rotas pet

//listar pets
router.get("/pets", async (req, res) => {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
  });
  
  //Lista um pet
  router.get("/pets/:id", async (req, res) => {
    const { id } = req.params;
  
    const pet = await Pet.findByPk(id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Pet não encontrado." });
    }
  });
  
  //Adicionar Pet
  router.post("/pets", async (req, res) => {
    const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  
    try {
      const cliente = await Cliente.findByPk(clienteId);
      if (cliente) {
        const pet = await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
        res.status(201).json(pet);
      } else {
        res.status(404).json({ message: "Cliente não encontrado." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  
  router.put("/pets/:id", async (req, res) => {
    //Esses são os dados que virão no corpo JSON
    const { nome, tipo, dataNasc, porte } = req.body;
    //É necessário checar a existência do Pet
    //SELECT * FROM pets WHERE id - req.params.id
    const pet = await Pet.findByPk(req.params.id);
    //Se pet é null => não existe pet com o id
  
    try {
      if (pet) {
        //IMPORTANTE: Indicar qual pet a ser atualizado
        //1° arg:dados novos, 2ºarg:Where
        await Pet.update(
          { nome, tipo, dataNasc, porte },
          { where: { id: req.params.id } }
        );
      } else {
        //Retorna 404 - Caso o id seja inválido, a resposta será essa
        res.status(404).json({ message: "O pet não foi encontrado." });
      }
    } catch (err) {
      //Retorna 500 - servidor não funciona - problema no banco - erro inesperado
      res.status(500).json({ message: "Um erro aconteceu!" });
    }
  });
  
  router.delete("/pets/:id", async (req, res) => {
    const pet = await Pet.findByPk(req.params.id);
  
    try {
      if (pet) {
        //pet existe, podemos apagar
        await pet.destroy();
        res.json({ message: "O pet foi removido." });
      } else {
        res.status(404).json({ message: "O pet não foi encontrado." });
      }
    } catch {
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  







module.exports = router;