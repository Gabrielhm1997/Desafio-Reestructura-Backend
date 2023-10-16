import { Router } from "express"
import passport from "passport"

const routerUsers = Router()

routerUsers.post('/', passport.authenticate('register'), async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send({ status: false, mensaje: 'Usuario ya existente' })
        }
        res.status(200).send({ status: true, mensaje: 'Usuario creado' })
    } catch (error) {
        res.status(500).send({ status: false, mensaje: `Error al crear usuario ${error}` })
    }
})

export default routerUsers