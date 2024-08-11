import express from 'express'
import productsRouter from './routes/products.routes.js'
import ordersRouter from './routes/orders.routes.js'

export const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
