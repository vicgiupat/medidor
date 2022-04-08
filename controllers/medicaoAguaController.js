const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const db = require('../db')
const moment = require('moment')
const Usuario = db.Mongoose.model('usuario', db.Usuario_model, 'usuario')
const MedicaoAgua = db.Mongoose.model('medicaoAgua', db.medicaoAgua, 'medicaoAgua')

const medicaoGetPageAgua = async (req, res, next) => {

    const token = req.cookies['userData']
    if (!token) return res.redirect('/login')

    const decodedId = jwt.verify(token, process.env.SECRET)
    const userId = decodedId.id

    const docsUser = await Usuario.findById(userId)
    res.render('medicaoAgua', { docsUser });
}

const medicaoPostAgua = async (req, res) => {

    let data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth(2) + 1
    const ano = data.getFullYear()
    const hora = data.getHours()
    const minuto = data.getMinutes()
    const segundos = data.getSeconds()


    const dataAtual = ('0' + dia).slice(-2) + "/" + ('0' + mes).slice(-2) + "/" + ano
    const horaAtual = ('0' + hora).slice(-2) + ":" + ('0' + minuto).slice(-2) + ":" + ('0' + segundos).slice(-2)


    const { regSabesp, consumoDiario } = req.body

    const medicao = new MedicaoAgua({ dataAtual, horaAtual, regSabesp, consumoDiario })

    try {
        medicao.save()
        res.status(200).redirect('/')
    } catch (err) {
        console.log("Erro:", err)
    }

    //ENCAMINHA E-MAIL
    const user = process.env.USER
    const pass = process.env.PASS

    let transport = nodemailer.createTransport({
        host: 'email-ssl.com.br',
        port: 465,
        secure: true,
        auth: { user, pass }

    });

    let sendMessage = await transport.sendMail({
        from: user,
        to: "vribeiro@serramarshopping.com.br",
        subject: "teste de envio",
        html: " <h3><center>Medicao de Agua dia " + dataAtual + "</center></h3>"

            + " <table cellpadding='1' cellspacing='0' border=1 borderColor=#F7F7F7 ><tr bgcolor='#ffffff'><font size=2 face=arial color=#6d7065><td width = 150 align = 'center'>Tipos de registros </td > <td width= 150 align = 'center' > Registros em KWH</td ></tr > "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>Medidor Sabesp</td><td align = 'center'>" + regSabesp + "</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>Consumo Diario</td><td align = 'center'>" + consumoDiario + "</td></font></tr> "
            + "</table></br>"

    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })

    console.log(sendMessage)
}

const medicaoGetConsultaAgua = async (req, res) => {
    const dtReg = req.query.dtRegAgua
    const dtFormatada = moment(dtReg).format('DD/MM/YYYY')
    console.log(dtFormatada)
    const BuscaKwh = await MedicaoAgua.findOne({ dataAtual: dtFormatada })

    res.render('consultaAgua', { BuscaKwh });
}


//const dtTeste = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'')
//const dtFormat = dateformat(new Date(), "yyyy-mm-dd h:MM:ss")



module.exports = {
    medicaoGetPageAgua,
    medicaoGetConsultaAgua,
    medicaoPostAgua
}