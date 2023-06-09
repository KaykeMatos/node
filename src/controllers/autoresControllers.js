//import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch (erro) {
      next(erro);
    }

  };

  static listarAutorPorId = async(req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({ message: "Id do Autor não encontrado." });
      }
    } catch (erro) {
      next(erro);

    }
  };

  static cadastrarAutor = async(req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(200).send(autorResultado.toJSON());

    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async(req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso." });

    } catch (erro) {
      next(erro);
    }



  };

  static excluirAutor = async(req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }



  };
}


export default AutorController;