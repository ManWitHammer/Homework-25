const delSalemd = async (patchData) => {
    try {
        const newSale = 0
        const patchThis = {
            newSale
        }
        const info = await patchData(`https://readberries.onrender.com/editSale`, patchThis)
        try {
            alert('Скидка успешно удалена')
        } catch (err) {
            console.error('Произошла ошибка при получении пользователей', err)
        }
    } catch (err) {
        console.error('Произошла ошибка при получении пользователей', err)
    }
}

export default delSalemd