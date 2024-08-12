# Example of REST API with CQRS pattern

This project is a Node.js REST API built with Express.js, TypeScript, and Lowdb for managing products and orders. The API is structured using the CQRS (Command Query Responsibility Segregation) pattern and includes input validation using Joi. Configuration is managed using dotenv.

## Table of Contents

- [Example of REST API with CQRS pattern](#example-of-rest-api-with-cqrs-pattern)
	- [Table of Contents](#table-of-contents)
	- [Development](#development)
	- [Configuration](#configuration)
	- [Running the Application](#running-the-application)
		- [In Development](#in-development)
		- [In Production](#in-production)
	- [API Endpoints](#api-endpoints)
		- [Products](#products)
		- [Orders](#orders)

## Development

Install dependencies:
```bash
npm install
```

Build project:
```bash
npm run build
```

## Configuration

Environment variables are defined in the `.env` file.

Default envs:
```bash
PORT=3000
DB_FILE_NAME='db.json'
```

`db.json` is a database file used by **Lowdb**, it contains sample data.

## Running the Application

### In Development
To start the application in development mode with hot-reloading, run:
```bash
npm run dev
```

### In Production
To build and start the application in production mode, run:

```bash
npm run build
npm start
```
## API Endpoints

### Products

* [GET] /products/ - Get a list of all products.
* [POST] /products/ - Create a new product.
* [POST] /products/:id/restock - Restock a product by its ID.
* [POST] /products/:id/sell - Sell a product by its ID.

### Orders

* [POST] /orders/ - Create a new order.
