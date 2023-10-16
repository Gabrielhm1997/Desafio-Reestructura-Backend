import { Router } from "express"
import { authorization, passportError } from "../utils/messageErrors.js"
import { productsController } from "../controllers/products.controller.js"

const routerProducts = Router()
const controller = new productsController()

routerProducts.get('/', async (req, res) => {
    // ?type=title&query=teclado&limit=3&page=1&sort=desc
    controller.getProducts(req, res)
})
  
routerProducts.get('/:id', async (req, res) => {
    controller.getProductByID(req, res)
})

routerProducts.post('/', passportError('jwt'), authorization('admin'), async (req, res) => {
   controller.postProduct(req, res)
})

routerProducts.put('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    controller.putProduct(req, res)
})

routerProducts.delete('/:id', passportError('jwt'), authorization('admin'), async (req, res) => {
    controller.deleteProduct(req, res)
})

export default routerProducts