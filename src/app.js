import express from "express";
import db from "./config/db.Connect.js"
import livros from "./models/Livro.js";
import model from "mongoose";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())

routes(app);

/*const livros = [
        { id: 1, "titulo": "Harry potter e a Pedra filosofal" },
        { id: 2, "titulo": "Harry potter e a Camara secreta" }
    ]
*/


//Crud /Livros






//Get para Id específico
app.get('/livros/:id', (req, res) => {
        let index = buscaLivro(req.params.id);
        res.json(livros[index]);

    })
    // Criar novos id's
app.post('/livros', (req, res) => {
        livros.push(req.body);
        res.status(201).send('Livro foi cadastrado com sucesso!')
    })
    // Atualizar id's existentes
app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);

})

// Deletar Id's existentes

app.delete('/livros/:id', (req, res) => {
    let { id } = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} foi removido com sucesso!`)


})


function buscaLivro(id) {
    return livros.findIndex(livros => livros.id == id)
}

export default app;