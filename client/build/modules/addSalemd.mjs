const addSalemd = async (sales, getData, patchData) => {
    try {
        const users = await getData('https://readberries.onrender.com/getUsers')
        const user = users[Math.floor(Math.random() * users.length)]
        const newSale = sales[Math.floor(Math.random() * sales.length)]
        const patchThis = {
            newSale
        }
        await patchData(`https://readberries.onrender.com/editUser/${user._id}`, patchThis)
        try {
            if (user.sale == 0) {
                alert(`Скидка ${newSale}% была добавлена у товара ${user.name}`)
            } else {
                alert(`Скидка ${newSale}% была обнавлена у товара ${user.name}`)
            }
        } catch (err) {
            console.error('Произошла ошибка при получении пользователей', err)
        }
    } catch (err) {
        console.error('Произошла ошибка при получении пользователей', err)
    }
}

export default addSalemd