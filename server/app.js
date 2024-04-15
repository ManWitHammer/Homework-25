const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UsersModel = require('./models/UserModel')
const UserModel = require('./models/UserModel')

require('dotenv').config()

const port = process.env.PORT || 3002
const app = express()

app.use(
	cors({
		origin: ['https://homework-25.onrender.com', 'http://127.0.0.1:5500'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)

// получение всех пользователей из БД
app.get('/getUsers', async (req, res) => {
	try {
		const users = await UsersModel.find({})
		res.send(users)
	} catch (err) {
		console.error('Произошла ошибка при получении продуктов', err)
		res.send({ error: 'Произошла ошибка при получении продуктов', err })
	}
})

app.get('/getSale', async (req, res) => {
	try {
		const users = await UsersModel.find({ sale: { $gt: 0 }})
		res.send(users)
	} catch (err) {
		console.error('Произошла ошибка при получении продуктов', err)
		res.send({ error: 'Произошла ошибка при получении продуктов', err })
	}
})

let a = 12123.2132
// добавление нового пользователя в БД
app.post('/addUser', async (req, res) => {
	try {
		const { name, picture, cost, quantity, sale } = req.body
		const newUser = { name, picture, cost, quantity, sale }
		await UserModel.create(newUser)
		res.send({ message: 'Продукта успешно добавлен' })
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового продукта', err)
		res.send({
			error: `Произошла ошибка при добавлении нового продукта ${err}`
		})
	}
})

// редактирование пользователя в БД
app.patch('/editUser/:id', async (req, res) => {
	try {
		const id = req.params.id
	
		const { newSale } = req.body
		const user = await UserModel.findById(id)
		if (user) {
			user.sale = newSale
		}
		await user.save()
		res.send({ message: 'Cкидка успешно изменена' })
	} catch (err) {
		console.error('Произошла ошибка при редактировании скидки', err)
		res.send({
			error: `Произошла ошибка при редактировании скидки ${err}`
		})
	}
})

app.patch('/editSale', async (req, res) => {
	try {
		const { newSale } = req.body
		const users = await UserModel.find({});

		users.forEach(user => {
			user.sale = newSale
			user.save()
		})
		await users.save()
		res.send({ message: 'Cкидка успешно удалены' })
	} catch (err) {
		console.error('Произошла ошибка при удалении скидок', err)
		res.send({
			error: `Произошла ошибка при удалении скидок ${err}`
		})
	}
})

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
