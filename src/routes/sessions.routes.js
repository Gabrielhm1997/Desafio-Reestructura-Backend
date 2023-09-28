import { Router } from "express"
import passport from "passport"

const routerSessions = Router()

routerSessions.get('/', async (req, res) => {
    // console.log(req.session.user.email)
    // console.log(req.session.user)
    try {
        if (req.session.user.email) {
            res.status(200).send({ status: true, data: req.session.user})
        } else {
            res.status(404).send({ status: false, error: "Sesion no existente"})
        }
    } catch (error) {
        res.status(404).send({ status: false, error: `Error: ${error}`})
    }
})
 
routerSessions.post('/login', passport.authenticate('login'), async (req, res) => {//Login
    // console.log(req.user)
    // console.log(req.session)
    try {
        if (!req.user) {
            res.status(401).send({ status: false, error: "Email o contraseña invalida" })
        } else {
            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age ?? "Undefined",
                email: req.user.email,
                rol: req.user.rol
                //_id: req.user._id
            }
            res.status(200).send({ status: true, data: req.user })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, error: `Error al iniciar sesion ${error}` })
    }
})

routerSessions.get('/logout', (req, res) => {//Logout
    if (req.session) {
        req.session.destroy()
    }
    res.status(200).send({ status:true, data: 'Login eliminado' })
})

routerSessions.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
})

routerSessions.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Session creada' })
})

export default routerSessions