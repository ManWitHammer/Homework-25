const req1 = document.querySelector('.req1GET')
const req2 = document.querySelector('.req2POST')
const req3 = document.querySelector('.req3DEL')
const req4 = document.querySelector('.req4PATCH')
const mini = document.querySelector('.miniContainer')

	//! GET
const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

//! POST
const postData = (url, data) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

//! PATCH
const patchData = (url, updatedData) => {
	return new Promise((resolve, reject) =>
		fetch(`${url}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

//! DELETE
const deleteData = url => {
	return new Promise((resolve, reject) =>
		fetch(`${url}`, {
			method: 'DELETE'
		})
			.then(response => {
				if (response.ok) {
					resolve('Данные успешно удалены')
				} else {
					reject('Ошибка удаления данных')
				}
			})
			.catch(error => reject(error))
	)
}

req1.addEventListener('click', async () => {
	try {
		mini.innerHTML = ''
		const users = await getData('http://localhost:3002/getUsers')
		users.forEach(el => {
			mini.insertAdjacentHTML('afterbegin', 
			`
			<div id="${el._id}" class="thisBlock">
				<p class="thisText t1">ID: ${el._id}</p> 
				<p class="thisText t2">Имя: ${el.name}</p>
				<p class="thisText t3">Почта:${el.email}</p>
				<p class="thisText t4">Пароль: ${el.password}</p>
			</div>
			`)
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

req2.addEventListener('click', async () => {
	let name = prompt('Введите имя')
	let email = prompt('Введите почту')
	let password = prompt('Введите пароль')

	try {
		let user = {
			name,
			email,
			password
		}
		console.log(user)
		let info = await postData('http://localhost:3002/addUser', user)
		console.log(info)
		mini.insertAdjacentHTML('afterbegin', 
			`
			<div class="thisBlock">
				<p class="thisText t1">ID: В ожидании...</p>
				<p class="thisText t2">Имя: ${name}</p>
				<p class="thisText t3">Почта:${email}</p>
				<p class="thisText t4">Пароль: ${password}</p>
			</div>
			`)
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового пользователя', err)
	}
})

req3.addEventListener('click', async () => {
	try {
		let id1 = prompt('Введите ID, по которому ищем')
		let info = await deleteData(`http://localhost:3002/deleteUser/${id1}`)
		console.log(info)
		const users = document.querySelectorAll('.thisBlock')
		users.forEach(el => {
			if (el.id === id1) {
				el.remove()
			}
		})
	} catch (err) {
		console.error('Произошла ошибка при удалении пользователя', err)
	}
})

req4.addEventListener('click', async () => {
	try {
		let id = prompt('Введите имя, по которому ищем')
		let newName = prompt('Введите новое имя')
		let newEmail = prompt('Введите новый email') 
		let newPassword = prompt('Введите новый пароль')
		let user = {
			newName,
			newEmail,
			newPassword
		}
		let info = await patchData(`http://localhost:3002/editUser/${id}`, user)
		console.log(info)
		const users = document.querySelectorAll('.thisBlock')
		users.forEach(el => {
			if (el.id == id) {
				el.querySelector('.t2').innerText = newName
				el.querySelector('.t3').innerText = newEmail
				el.querySelector('.t4').innerText = newPassword
			}
		})
	} catch (err) {
		console.error('Произошла ошибка при редактировании пользователя', err)
	}
})
