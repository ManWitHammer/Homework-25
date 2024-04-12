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

export default patchData