import { Router } from 'express'
import { createOrder } from '../orders/orders.controller.js'

const router = Router()

router.post('/', createOrder)

export default router
