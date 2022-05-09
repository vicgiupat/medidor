const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const db = require('../db')
const moment = require('moment')
const Usuario = db.Mongoose.model('usuario', db.Usuario_model, 'usuario')
const MedicaoKwhAdm = db.Mongoose.model('medicaoKwhAdm', db.medicaoKwhAdm, 'medicaoKwhAdm')

const medicaoGetPageKwhAdm = async (req, res, next) => {

    const token = req.cookies['userData']
    if (!token) return res.redirect('/login')

    const decodedId = jwt.verify(token, process.env.SECRET)
    const userId = decodedId.id

    const docsUser = await Usuario.findById(userId)
    res.render('medicaoKwhAdm', { docsUser });
}

const medicaoPostKwhAdm = async (req, res) => {

    let data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth(2) + 1
    const ano = data.getFullYear()
    const hora = data.getHours()
    const minuto = data.getMinutes()
    const segundos = data.getSeconds()


    //const dataAtual = ('0' + dia).slice(-2) + "/" + ('0' + mes).slice(-2) + "/" + ano
    const horaAtual = ('0' + hora).slice(-2) + ":" + ('0' + minuto).slice(-2) + ":" + ('0' + segundos).slice(-2)


    const { dataAtual, reg1 } = req.body

    const medicao = new MedicaoKwhAdm({ dataAtual, horaAtual, reg1 })

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
        html: " <h3><center>Medicao KWh ADM dia " + dataAtual + "</center></h3>"

            + " <table cellpadding='1' cellspacing='0' border=1 borderColor=#F7F7F7 ><tr bgcolor='#ffffff'><font size=2 face=arial color=#6d7065><td width = 150 align = 'center'>Tipos de registros </td > <td width= 150 align = 'center' > Registros em KWH</td ></tr > "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>KWh da ADM</td><td align = 'center'>" + reg1 + "</td></font></tr> "
            + "</table></br>"

    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })

    console.log(sendMessage)
}

const medicaoGetConsultaKwhAdm = async (req, res) => {
    const dtReg = req.query.dtRegKwhAdm
    //const dtFormatada = moment(dtReg).format('DD/MM/YYYY')
    console.log(dtReg)
    const BuscaKwh = await MedicaoKwhAdm.findOne({ dataAtual: dtReg })
    if (!BuscaKwh) return res.send('ESSA DATA RETORNOU NÃO POSSUI DADOS')
    res.render('consultaKwhAdm', { BuscaKwh });
}


//const dtTeste = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'')
//const dtFormat = dateformat(new Date(), "yyyy-mm-dd h:MM:ss")



module.exports = {
    medicaoGetPageKwhAdm,
    medicaoGetConsultaKwhAdm,
    medicaoPostKwhAdm
}