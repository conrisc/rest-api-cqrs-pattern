import { Router } from 'express'
import { getProducts, createProduct, restockProduct, sellProduct } from '../products/products.controller.js'

const router = Router()

router.get('/', getProducts)
router.post('/', createProduct)
router.post('/:id/restock', restockProduct)
router.post('/:id/sell', sellProduct)

export default router
