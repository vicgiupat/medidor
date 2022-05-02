require('dotenv').config();
const express       = require('express')
const path          = require('path')
const cookieParser  = require('cookie-parser')
const jwt           = require('jsonwebtoken')
const app           = express()
const usuarioRoutes = require('./routes/usuarioRoutes')
const medicaoRoutes = require('./routes/medicaoRoutes')

app.use(express.static(path.join(__dirname, 'public'))) //DEFINE PASTA ONDE VAI FICAR OS ARQUIVOS PUBLICO  - - > HTML, EJS
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(usuarioRoutes)
app.use(medicaoRoutes)

/*-------------EXPORTAR MODEL DE USUARIO------------------------------------*/

/*--------------------------------------------------------------------------*/

/*-------------EXPORTAR MODEL DE MEDIÇÃO------------------------------------*/

/*--------------------------------------------------------------------------*/

///////////////////////MIDDLEWARE////////////////////////////////////////////////////////////////////////////////

function verificaToken(req, res, next) {
    const token = req.cookies['userData']
    console.log(token)

    if (!token) res.redirect('login')

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) console.log("Problemas com a autenticação! Consulte o Administrador do sistema.")

        UserId = decoded.id
       next()
    })
}

app.get('/', verificaToken, (req,res) => {
    res.render('index')
})


app.listen(5000)
module.exports = app;