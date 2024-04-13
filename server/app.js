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
		origin: ['https://homework-25.onrender.com'],
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
		console.error('Произошла ошибка при получении пользователей', err)
		res.send({ error: 'Произошла ошибка при получении пользователей', err })
	}
})

app.get('/getSale', async (req, res) => {
	try {
		const users = await UsersModel.find({ sale: { $gt: 0 }})
		res.send(users)
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
		res.send({ error: 'Произошла ошибка при получении пользователей', err })
	}
})

let a = 12123.2132
// добавление нового пользователя в БД
app.post('/addUser', async (req, res) => {
	try {
		const { name, picture, cost, quantity, sale } = req.body
		const newUser = { name, picture, cost, quantity, sale }
		await UserModel.create(newUser)
		res.send({ message: 'Пользователь успешно добавлен' })
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового пользователя', err)
		res.send({
			error: `Произошла ошибка при добавлении нового пользователя ${err}`
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
		res.send({ message: 'Пользователь успешно отредактирован' })
	} catch (err) {
		console.error('Произошла ошибка при редактировании пользователя', err)
		res.send({
			error: `Произошла ошибка при редактировании пользователя ${err}`
		})
	}
})

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
