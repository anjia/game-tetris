const tetris = document.getElementById('tetris')

document.addEventListener('setting', (e) => {
    const data = e.detail()
    for (let key in data) {
        tetris.setAttribute(key, data[key])
    }
})