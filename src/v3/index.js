const tetris = document.getElementById('tetris')

// TODO. 观察者模式在事件侦听场景下的应用
document.addEventListener('setting', (e) => {
    const data = e.detail()
    for (let key in data) {
        tetris.setAttribute(key, data[key])  // 'people', 'games'
    }
})