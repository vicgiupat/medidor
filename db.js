require('dotenv').config()
const user = process.env.user
const password = process.env.password
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mongo_serramar:CvvyifQZN0ryriCY@serramar.o3apb.mongodb.net/medidor?retryWrites=true&w=majority')

const Usuario_model = new mongoose.Schema({
    nome_cad: String,
    telefone_cad: String,
    senha_hash : String
}, { collection: 'usuario' }
);

const medicao = new mongoose.Schema({
    dataAtual: String,
    reg3: Number,
    reg4: Number,
    reg6: Number,
    reg8: Number,
    reg10: Number,
    reg12: Number,
    reg14: Number,
}, { collection: 'medicao' }
);

module.exports = { Mongoose: mongoose, Usuario_model: Usuario_model, medicao: medicao }