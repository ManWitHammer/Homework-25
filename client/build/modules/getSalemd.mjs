const getSalemd = async (container, container1, getData) => {
    container.innerHTML = ''
	container1.style.display = 'none'
	try {
		let users = await getData('https://readberries.onrender.com/getSale')
		users.forEach(el => {
			container.insertAdjacentHTML('beforeend',
			`
			<div class="user">
				<div class="picture">
						<img src="${el.picture}" onerror = "this.style.display = 'none'">
					${el.sale != 0 ? `<div class="overlay">-${el.sale}%</div>` : ''}
					<div class="timer"></div>
				</div>
				<p class="cost">${el.sale != 0 ? `<span style="text-decoration: line-through;">${el.cost}</span>` 
				: ''} ${(el.cost - el.cost * (el.sale / 100)).toFixed(2)}</p>
				<p class="producer">${el.name.length > 20 ? el.name.slice(0, 20) + '...' : el.name}</p>
				<p class="producer">${el.quantity != 0 ? `<span><b>${el.quantity}</b></span> в наличии` : 'нет в наличии'}</p>
			</div>
			`
			)
		})
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
}

export default getSalemd