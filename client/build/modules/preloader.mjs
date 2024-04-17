const preloader = (preload) => {
    const spinner = document.querySelector('.spinner')
    preload.classList.add('invisblock');
    spinner.style.display = 'none'
    setTimeout(() => {
        preload.style.display = 'none'
    }, 1000)
}

export default preloader