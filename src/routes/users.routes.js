import { Router } from "express"
import passport from "passport"
import { generateToken } from "../utils/jwt.js"

const routerUsers = Router()

routerUsers.post('/', passport.authenticate('register'), async (req, res) => {

    try {
        if (!req.user) {
            res.status(400).send({ status: false, mensaje: 'Usuario ya existente' })
        }
        const jwtUser = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol: req.user.rol
        }

        req.user = jwtUser

        const token = generateToken(req.user)

        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        }) 
        res.status(200).send({ status: true, mensaje: 'Usuario creado' })
    } catch (error) {
        res.status(500).send({ status: false, mensaje: `Error al crear usuario ${error}` })
    }
})

export default routerUsers