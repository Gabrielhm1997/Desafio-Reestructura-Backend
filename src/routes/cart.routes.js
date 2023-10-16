import { Router } from "express"
import { cartsController } from "../controllers/carts.controller.js"

const routerCarts = Router()
const controller = new cartsController

routerCarts.post('/', async (req, res) => {// Crea un nuevo carrito vacio
    controller.postCart(req, res)
})

routerCarts.post('/:cid/products/:pid', async (req, res) => {// Agrega un producto por su id al carrito
    controller.postProductInCart(req, res)
})

routerCarts.get('/:cid', async (req, res) => {// Lista los productos del carrito
    controller.getProductsFromCart(req, res)
})

routerCarts.put('/:cid', async (req, res) => {// Agrega un array al carrito
    controller.putArrayOnCart(req, res)
})

routerCarts.put('/:cid/products/:pid', async (req, res) => {// Actualiza solo quantity 
    controller.putUpdateProductCuantity(req, res)
})

routerCarts.delete('/:cid', async (req, res) => {// Vaciar el carrito
    controller.deleteEmptyCart(req, res)
})

routerCarts.delete('/:cid/products/:pid', async (req, res) => {// Elimina un producto especifico del carrito
    controller.deleteProductFromCart(req, res)
})

export default routerCarts