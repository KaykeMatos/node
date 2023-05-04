import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {

  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Um ou mais dados específicos estão incorretos" });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    res.status(400).send({ message: `Erro: ${mensagensErro}` });
  } else {
    res.status(500).send({ message: "Erro interno no servidor!" });
  }
}


export default manipuladorDeErros;