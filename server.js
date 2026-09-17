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
        console.log("Erro ao conectar com o MySQL:", erro);
    } else {
        console.log("MySQL conectado!");
    }
});

app.post("/login", (req, res) => {

    const { usuario, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?";

    banco.query(sql, [usuario, senha], (erro, resultados) => {

        if (erro) {
            console.log("Erro na consulta:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro no servidor."
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
                mensagem: "Usuário ou senha incorretos."
            });

        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});