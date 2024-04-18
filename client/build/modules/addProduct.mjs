const addProductmd = async (container, container1, form, button, postData) => {
    container.innerHTML = ''
	container1.style.display = 'block'
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
		try {
			await postData(`https://readberries.onrender.com/addUser`, user)
			alert(`Продукт ${user.name} был добавлен!`)
			form.reset()
		} catch (err) {
			console.error('Произошла ошибка при добавлении нового продукта', err)
		}
	})
}

export default addProductmd