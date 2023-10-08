import { Router } from "express"
import productModel from "../models/products.models.js"
import { authorization, passportError } from "../utils/messageErrors.js"

const routerProducts = Router()

routerProducts.get('/', async (req, res) => { // Devuelve los productos del inventario

    // ?type=title&query=teclado&limit=3&page=1&sort=desc
    const { limit, page, sort, type, query } = req.query
   
    const queryType = ""

    if(type && query){
        queryType = JSON.parse(`{ "${type}": "${query}"  }`) // Formato de la query
    }

    try {
        const inventory = await productModel.paginate(queryType, { limit: limit ?? 10, page: page ?? 1, sort: { price: sort } })
        console.log(inventory)
        const response = { status: true, ...inventory}
        console.log(inventory)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({ status: false, error:error})
    }
})

routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const product = await productModel.findById(id) //Retorna el objeto o null
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send(`Not Found`)
        }
    } catch (error) {
        res.status(400).send(`Error checking inventory: ${error}`)
    }
})

routerProducts.post('/', passportError('jwt'), authorization('Admin'), async (req, res) => {
    const { title, description, stock, code, price, category } = req.body

    try {
        const response = await productModel.create({ title, description, stock, code, price, category }) // Devuelve el objeto creado 
        res.status(200).send(`Product created successfully`)
    } catch (error) {                                                                                    // Cualquier tipo de error lo captura el Catch
        res.status(400).send(`Error creating product: ${error}`)
    }
})

routerProducts.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, stock, code, price, category, status } = req.body

    try {
        const response = await productModel.findByIdAndUpdate(id, { title, description, stock, code, price, category, status }) //Retorna el objeto o null

        if (response) {
            res.status(200).send(`Product updated successfully`)
        } else {
            res.status(404).send(`Not Found`)
        }

    } catch (error) {
        res.status(400).send(`Error updating product: ${error}`)
    }
})

routerProducts.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await productModel.findByIdAndDelete(id) //Retorna el objeto o null

        if (response) {
            console.log(response)
            res.status(200).send(`Product deleted successfully`)
        } else {
            console.log(response)
            res.status(404).send(`Not Found`)
        }
    } catch (error) {
        res.status(400).send(`Error deleting product: ${error}`)
    }
})

export default routerProducts