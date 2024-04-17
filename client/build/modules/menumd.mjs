const menumd = (body, vibor) => {
    body.insertAdjacentHTML('afterbegin',
	`
		<div class="backGrey"></div>
	`)
	const backGrey = document.querySelector('.backGrey')
	setTimeout(() => {
		vibor.classList.add('perehod')
		vibor.classList.remove('perehod1')
	}, 10)
	backGrey.addEventListener('click', () => {
		vibor.classList.remove('perehod')
		vibor.classList.add('perehod1')
		backGrey.classList.add('hide1')
		setTimeout(() => {
			backGrey.remove()
		}, 400)
	})
}

export default menumd