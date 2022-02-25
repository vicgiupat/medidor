const jwt        = require('jsonwebtoken')
const db         = require('../db')
const Usuario    = db.Mongoose.model('usuario', db.Usuario_model, 'usuario') 
const Medicaokwh = db.Mongoose.model('medicaokwh', db.medicaokwh, 'medicaokwh')

const medicaoGetPageKwh = async (req, res, next) => {
    const token = req.cookies['userData']
    if (!token) return res.redirect('/login')
    const decodedId = jwt.verify(token, process.env.SECRET)
    const userId = decodedId.id

    const docsUser = await Usuario.findById(userId)
    res.render('medicaoKWH', { docsUser });

}

const medicaoPostKwh = async (req, res) => {
    let data = new Date()

    const dia = data.getDate()
    const mes = data.getMonth(2) + 1
    const ano = data.getFullYear()
    const hora = data.getHours()
    const minuto = data.getMinutes()
    const segundos = data.getSeconds()

    const dataAtual = ('0' + dia).slice(-2) + "/" +  ('0' + mes).slice(-2) + "/" + ano
    const horaAtual = ('0' + hora).slice(-2) + ":" + ('0' + minuto).slice(-2) + ":" + ('0' + segundos).slice(-2)

    const { reg3, reg4, reg6, reg8, reg10, reg12, reg14 } = req.body

    const medicao = new Medicaokwh({ dataAtual, horaAtual, reg3, reg4, reg6, reg8, reg10, reg12, reg14 })

    try {
        medicao.save()
        res.status(200).redirect('/medicao')
    } catch (err) {
        console.log("Erro:", err)
    }
}

const medicaoGetConsultaKwh = async (req, res) => {
    const dtReg = req.body
    const dtFormatada = dtReg.toString()
    console.log(dtFormatada)
    const Consultakwh = await Medicaokwh.find({})

    res.render('consultakwh', { Consultakwh });
}

module.exports = {
    medicaoGetPageKwh,
    medicaoGetConsultaKwh,
    medicaoPostKwh
}