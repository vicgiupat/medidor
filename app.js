require('dotenv').config();
const express      = require('express')
const path         = require('path')
const jwt          = require('jsonwebtoken')
const bcrypt       = require('bcrypt')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.static(path.join(__dirname, 'public'))) //DEFINE PASTA ONDE VAI FICAR OS ARQUIVOS PUBLICO  - - > HTML, EJS
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

/*-------------EXPORTAR MODEL DE USUARIO------------------------------------*/
const db = require('./db')
const Usuario = db.Mongoose.model('usuario', db.Usuario_model, 'usuario')
/*--------------------------------------------------------------------------*/

/*-------------EXPORTAR MODEL DE MEDIÇÃO------------------------------------*/
const Medicao = db.Mongoose.model('medicao', db.medicao, 'medicao')
/*--------------------------------------------------------------------------*/


function verificaToken(req, res, next) {
    const token = req.cookies['userData']
    console.log(token)

    if (!token) res.redirect('login')

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.send("Problemas com a autenticação! Consulte o Administrador do sistema.")

        UserId = decoded.id
        next()
    })

}

app.get('/selec', (req,res) => {
    res.render('selecModulos')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
   res.render('login')     
    
})

app.get('/medicao', verificaToken, async (req, res, next) => {
    const token = req.cookies['userData']
    const decodedId = jwt.verify(token, process.env.SECRET)
    const userId = decodedId.id

    const docsUser = await Usuario.findById( userId )
    res.render('medicaoKWH', { docsUser });

})

app.post('/cadastro', async (req, res) => {
    const { nome_cad, telefone_cad, senha_cad } = req.body

    const senha_hash = await bcrypt.hash(req.body.senha_cad, 10)

    const usuario = new Usuario({ nome_cad, telefone_cad, senha_hash })

    try {
        usuario.save();
        res.redirect('login')
        console.log("cadastrado com sucesso!!")
    } catch (err) {
            console.log(err)
    }

})

app.post('/login', async (req, res) => {
    const { telefone_login, senha_login } = req.body

    if (!telefone_login) return res.status(404).json({ msg: "Obrigatório preencher telefone"    })
    if (!senha_login)    return res.status(404).json({ msg: "Obrigatório preencher campo SENHA" })

    const usuario = await Usuario.findOne({ telefone_cad: telefone_login })

    if (!usuario) return res.status(404).json({ msg: "Usuario não encontrado" })

    try {
        const senhaExiste = await bcrypt.compare(senha_login, usuario.senha_hash)
        if (!senhaExiste) return res.status(404).json({ msg: "Senha não corresponde!!" })

    }catch (err) {
        return res.status(404)
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: usuario._id }, secret)

        let atributos_cookie = {
            path: "/",
            sameSite: true,
            maxAge: 900000,
            httpOnly: true
        }
        res.cookie('userData',token,atributos_cookie)
    } catch (err) {
        return res.send("falha")
    }

    res.status(200).redirect("/medicao")
})

app.post('/medicao', async (req, res) => {
    let data = new Date()

    const dia      = data.getDate()
    const mes      = data.getMonth(2)+1
    const ano      = data.getFullYear()
    const hora     = data.getHours()
    const minuto   = data.getMinutes()
    const segundos = data.getSeconds()

    const dataAtual = ('0' + dia).slice(-2) + "/" + ('0' + mes).slice(-2)     + "/" + ano
    const horaAtual = ('0' + hora).slice(-2) + ":" + ('0' + minuto).slice(-2) + ":" + ('0' + segundos).slice(-2)
 
    const { reg3, reg4, reg6, reg8, reg10, reg12, reg14 } = req.body

    const medicao = new Medicao({ dataAtual, horaAtual, reg3, reg4, reg6, reg8, reg10, reg12, reg14 })

    try {
        medicao.save()
        res.status(200).redirect('/medicao')
    } catch (err) {
        console.log("Erro:", err)
    }
})

app.listen(3001)
module.exports = app;