const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const db         = require('../db')
const moment     = require('moment')
const Usuario    = db.Mongoose.model('usuario', db.Usuario_model, 'usuario') 
const Medicaokwh = db.Mongoose.model('medicaokwh', db.medicaokwh, 'medicaokwh')

//ROTA QUE ENTREGA O FORMULARIO DE MEDIÇÃO E RETORNA O USUARIO A PARTIR DO TOKEN
const medicaoGetPageKwh = async (req, res, next) => {

    const token = req.cookies['userData']
    if (!token) return res.redirect('/login')

    const decodedId = jwt.verify(token, process.env.SECRET)
    const userId = decodedId.id

    const docsUser = await Usuario.findById(userId)
    res.render('medicaoKWH', { docsUser });
}

//ROTA QUE ENCAMINHA OS DADOS DO FORMULÁRIO PARA O SERVIDOR
const medicaoPostKwh = async (req, res) => {
    
    let data       = new Date()
    const dia      = data.getDate()
    const mes      = data.getMonth(2) + 1
    const ano      = data.getFullYear()
    const hora     = data.getHours()
    const minuto   = data.getMinutes()
    const segundos = data.getSeconds()


    const dataAtual = ('0' + dia).slice(-2) + "/" +  ('0' + mes).slice(-2) + "/" + ano
    const horaAtual = ('0' + hora).slice(-2) + ":" + ('0' + minuto).slice(-2) + ":" + ('0' + segundos).slice(-2)

    //const dataAtual = new Date().toISOString('pt-BR').replace(/T/, ' ').replace(/\..+/, '')

    const { reg3, reg4, reg6, reg8, reg10, reg12, reg14 } = req.body

    const medicao = new Medicaokwh({ dataAtual, horaAtual, reg3, reg4, reg6, reg8, reg10, reg12, reg14 })

    try {
        medicao.save()
        res.status(200).redirect('/medicao')
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
        html: " <h3><center>Medicao dia " + dataAtual + "</center></h3>"

            + " <table cellpadding='1' cellspacing='0' border=1 borderColor=#F7F7F7 ><tr bgcolor='#ffffff'><font size=2 face=arial color=#6d7065><td width = 150 align = 'center'>Tipos de registros </td > <td width= 150 align = 'center' > Registros em KWH</td ></tr > "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>3</td><td align = 'center'>" + reg3 + "</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>4</td><td align = 'center'>" + reg4 + "</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>6</td><td align = 'center'>" +reg6 + "</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>8</td><td align = 'center'>" + reg8 +"</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>10 </td><td align = 'center'>" + reg10+"</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>12 </td><td align = 'center'>" + reg12+ "</td></font></tr> "
            + " <tr><font size=2 face=arial color=#6d7065><td align = 'center'>14 </td><td align = 'center'>" + reg14+ "</td></font></tr> "
            + "</table></br>"  //reg3, reg4, reg6, reg8, reg10, reg12, reg14

    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })

    console.log(sendMessage) 
}

const medicaoGetConsultaKwh = async (req, res) => {
    const dtReg = req.query.dtReg
    const dtFormatada = moment(dtReg).format('DD/MM/YYYY')
    console.log(dtFormatada)
    const BuscaKwh = await Medicaokwh.findOne({ dataAtual: dtFormatada})

    res.render('consultakwh', { BuscaKwh });
}


//const dtTeste = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'')
//const dtFormat = dateformat(new Date(), "yyyy-mm-dd h:MM:ss")



module.exports = {
    medicaoGetPageKwh,
    medicaoGetConsultaKwh,
    medicaoPostKwh
}