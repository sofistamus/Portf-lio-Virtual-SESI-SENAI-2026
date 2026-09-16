const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "port_sofia"
});

banco.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao MySQL:");
        console.log(erro);
    } else {
        console.log("MySQL conectado!");
    }
});

app.post("/login", (req, res) => {

    const { usuario, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE usuario = ? AND senha = ?
    `;

    banco.query(sql, [usuario, senha], (erro, resultados) => {

        if (erro) {
            console.log(erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro no banco de dados."
            });
        }

        if (resultados.length > 0) {

            res.json({
                sucesso: true,
                mensagem: "Login realizado com sucesso!"
            });

        } else {

            res.json({
                sucesso: false,
                mensagem: "Usuário ou senha incorretos!"
            });

        }

    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});