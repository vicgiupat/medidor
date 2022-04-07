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

const medicaokwh = new mongoose.Schema({
    dataAtual: String,
    horaAtual: String,
    reg3: Number,
    reg4: Number,
    reg6: Number,
    reg8: Number,
    reg10: Number,
    reg12: Number,
    reg14: Number,
}, { collection: 'medicaokwh' }
);

const medicaoKwhAdm = new mongoose.Schema({
    dataAtual: String,
    horaAtual: String,
    reg1: Numeber
}, { collection: 'medicaoKwhAdm' }
);
const medicaoAgua = new mongoose.Schema({
    dataAtual: String,
    horaAtual: String,
    regSabesp: Number,
    consumoDiario: Number
}, { collection: 'medicaoAgua' }
);

const medicaoTemperaturaPa = new mongoose.Schema({
    dataAtual: String,
    horaAtual: String,
    grilleto: Number,
    divinoFogao: Number,
    hashi: Number,
    mcDonalds: Number,
    extGrilleto: Number,
    pracaEventos: Number
} { collection: 'medicaoTemperaturaPa' }
);

const medicaoEnergiaRenz = new mongoose.Schema({
    dataAtual: String,
    horaAtual: String,
    med1: Number,
    med2: Number,
    medLoja: Number
}, { collection: 'medicaoEnergiaRenz' }
);


/*medicaokwh.set('timestamps', {
    createdAt: "crdAt",
    UpdateAt:   'updAt'
})*/
module.exports = {
    Mongoose: mongoose, Usuario_model: Usuario_model, medicaokwh: medicaokwh,
    medicaoKwhAdm: medicaoKwhAdm, medicaoAgua: medicaoAgua, medicaoTemperaturaPa: medicaoTemperaturaPa,
    medicaoEnergiaRenz: medicaoEnergiaRenz
}