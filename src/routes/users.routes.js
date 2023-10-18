import { Router } from "express"
import passport from "passport"
import { usersController } from "../controllers/users.controller.js"

const routerUsers = Router()
const controller = new usersController()

routerUsers.post('/', passport.authenticate('register'), async (req, res) => {
    controller.postUser(req, res)
})

export default routerUsers