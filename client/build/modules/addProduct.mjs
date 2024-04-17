const addProductmd = async (container, container1, form, button, postData) => {
    container.innerHTML = ''
	container1.style.display = 'block'
	try {
		button.addEventListener('click', async (e) => {
			e.preventDefault()
			const data = new FormData(form)
			const user = {
				name: data.get('name'),
				picture: data.get('image'),
				cost: +data.get('cost'),
				quantity: +data.get('quantity'),
				sale: 0
			}
			await postData(`https://readberries.onrender.com/addUser`, user)
			form.reset()
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
}

export default addProductmd