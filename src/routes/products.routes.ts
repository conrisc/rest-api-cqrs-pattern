import { Router } from 'express'
import { getProducts } from '../products/products.controller'

const router = Router()

router.get('/', getProducts)

export default router
