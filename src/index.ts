import express from 'express'
import productsRouter from './routes/products.routes'

export const app = express()

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/products', productsRouter)
