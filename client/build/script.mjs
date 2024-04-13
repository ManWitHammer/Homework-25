import getData from './modules/getData.mjs'
import postData from './modules/postData.mjs'
import patchData from './modules/patchData.mjs'

const container = document.querySelector('.container')
const preloader = document.querySelector('.preloader');
const infoblocked = document.querySelector('.infoblock')
const spinner = document.querySelector('.spinner')
const body = document.querySelector('body')
const getAll = document.querySelector('.getAll')
const getSale = document.querySelector('.getSale')
const addSale = document.querySelector('.addSale')
const addProduct = document.querySelector('.addProduct')
let sales = [5, 10, 15, 20, 25]

window.addEventListener('load', function () {
    preloader.classList.add('invisblock');
    spinner.style.display = 'none'
    setTimeout(() => {
        preloader.style.display = 'none'
    }, 1000)
  });

const users = await getData('http://localhost:3002/getUsers')

document.addEventListener('DOMContentLoaded', async () => {
	if (!localStorage.getItem('cutscene')) {
		body.insertAdjacentHTML('afterbegin', 
		`
		<div class="cutscene">
			<p id="animatedText"></p>
		</div>
		`)
		const text = "Ты администратор этой странички. Твоя задача добавлять товары, а также добавлять на них скидки. Для этого мы тебе упростили жизнь, и добавили кнопки, отвечающиеся за что-то. Удачи тебе...";
		const words = text.split("")
		const cutscene = document.querySelector('.cutscene')
		const animatedText = document.getElementById("animatedText");
		let i = 0;
		
		const displayNextWord = () => {
			if (i < words.length) {
				const wordSpan = document.createElement("span");
				wordSpan.textContent = words[i]
				animatedText.appendChild(wordSpan)
				
				setTimeout(() => {
					wordSpan.style.opacity = 1;
				}, 20)
				
				i++
				setTimeout(displayNextWord, 90)
			}
		}
    	displayNextWord()
		setTimeout(() => {
			cutscene.insertAdjacentHTML('afterbegin',
			`
			<h1>Пропустить...</h1>
			`)
			const miss = document.querySelector('.cutscene h1')
			miss.addEventListener('click', () => {
				cutscene.classList.add('hide')
				localStorage.setItem('cutscene', true)
				setTimeout(() => {
					cutscene.remove()
				}, 1000)
			})
		}, 5000)
	}
})

getAll.addEventListener('click', async () => {
	container.innerHTML = ''
	try {
		users.forEach(el => {
			container.insertAdjacentHTML('beforeend',
			`
			<div class="user">
				<div class="picture">
					<img src="${el.picture}">
					${el.sale != 0 ? `<div class="overlay">-${el.sale}%</div>` : ''}
					<div class="timer"></div>
				</div>
				<p class="cost">${el.sale != 0 ? `<span style="text-decoration: line-through;">${el.cost}</span>`
				: ''} ${(el.cost - el.cost * (el.sale / 100)).toFixed(2)}</p>
				<p class="producer">${el.name}</p>
				<p class="producer"><span>${el.quantity}</span> в наличии</p>
			</div>
			`
			)
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

getSale.addEventListener('click', async () => {
	container.innerHTML = ''
	try {
		let users = await getData('http://localhost:3002/getSale')
		users.forEach(el => {
			container.insertAdjacentHTML('beforeend',
			`
			<div class="user">
				<div class="picture">
					<img src="${el.picture}">
					${el.sale != 0 ? `<div class="overlay">-${el.sale}%</div>` : ''}
					<div class="timer"></div>
				</div>
				<p class="cost">${el.sale != 0 ? `<span style="text-decoration: line-through;">${el.cost}</span>` 
				: ''} ${(el.cost - el.cost * (el.sale / 100)).toFixed(2)}</p>
				<p class="producer">${el.name}</p>
				<p class="producer"><span>${el.quantity}</span> в наличии</p>
			</div>
			`
			)
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

addSale.addEventListener('click', async () => {
	try {
		const user = users[Math.floor(Math.random() * users.length)]
		const newSale = sales[Math.floor(Math.random() * sales.length)]
		const patchThis = {
			newSale
		}
		const info = await patchData(`http://localhost:3002/editUser/${user._id}`, patchThis)
		console.log(info)
		if (user.sale == 0) {
			alert(`Скидка ${newSale}% была добавлена у товара ${user.name}`)
		} else {
			alert(`Скидка ${newSale}% была обнавлена у товара ${user.name}`)
		}
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

addProduct.addEventListener('click', async (e) => {
	e.preventDefault()
	container.innerHTML = ''
	try {
		container.insertAdjacentHTML('beforeend',
		`
		<form action="#">
			<input type="text" name="name" class="namedHim" placeholder="название товара">
			<input type="text" name="cost" placeholder="цена товара" class="costHim">
			<input type="number" name="quantity" placeholder="колличество товаров" class="quantityHim">
			<input type="text" name="image" placeholder="ссылка на картинку желательно формат 5x6" class="imagedHim">
			<button type="submit" class="addedHim">Добавить</button>
		</form>
		`)
		const button = document.querySelector('.addedHim')
		button.addEventListener('click', async (e) => {
			const form = document.querySelector('form')
			const data = new FormData(form)
			const user = {
				name: data.get('name'),
				picture: data.get('image'),
				cost: +data.get('cost'),
				quantity: +data.get('quantity'),
				sale: 0
			}
			await postData(`http://localhost:3002/addUser`, user)
			form.reset()
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

// req2.addEventListener('click', async () => {
// 	let name = prompt('Введите имя')
// 	let email = prompt('Введите почту')
// 	let password = prompt('Введите пароль')

// 	try {
// 		let user = {
// 			name,
// 			email,
// 			password
// 		}
// 		console.log(user)
// 		let info = await postData('http://localhost:3002/addUser', user)
// 		console.log(info)
// 		mini.insertAdjacentHTML('afterbegin', 
// 			`
// 			<div class="thisBlock">
// 				<p class="thisText t1">ID: В ожидании...</p>
// 				<p class="thisText t2">Имя: ${name}</p>
// 				<p class="thisText t3">Почта:${email}</p>
// 				<p class="thisText t4">Пароль: ${password}</p>
// 			</div>
// 			`)
// 	} catch (err) {
// 		console.error('Произошла ошибка при добавлении нового пользователя', err)
// 	}
// })