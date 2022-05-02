require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const Usuario = db.Mongoose.model('usuario', db.Usuario_model, 'usuario')

const usuarioGetLogin = (req, res) => {
    res.render('login_cadastro')
}

const usuarioPostLogin = async (req, res) => {
    const { telefone_login, senha_login } = req.body

    if (!telefone_login) return res.status(404).json({ msg: "Obrigatório preencher telefone" })
    if (!senha_login)    return res.status(404).json({ msg: "Obrigatório preencher campo SENHA" })

    const usuario = await Usuario.findOne({ telefone_cad: telefone_login })

    if (!usuario) return res.status(404).json({ msg: "Usuario não encontrado" })

    try {
        const senhaExiste = await bcrypt.compare(senha_login, usuario.senha_hash)
        if (!senhaExiste) return res.status(404).json({ msg: "Senha não corresponde!!" })

    } catch (err) {
        return res.status(404)
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: usuario._id }, secret)

        let atributos_cookie = {
            path: "/",
            sameSite: true,
            maxAge: 1800000,
            httpOnly: true
        }
        res.cookie('userData', token, atributos_cookie)
    } catch (err) {
        return res.send("falha")
    }

    res.status(200).redirect('/')
}
/*----------------------------------------------------------------------------------------*/
const usuarioPostCadastro = async (req, res) => {
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
}


module.exports = {
    usuarioPostLogin,
    usuarioPostCadastro,
    usuarioGetLogin,
}