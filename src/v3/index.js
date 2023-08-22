const tetris = document.getElementById('tetris')

// TODO. 观察者模式在事件侦听场景下的应用
// TODO. 事件的命名？
document.addEventListener('attributesChanged', (e) => {
    const data = e.detail()
    for (let key in data) {
        tetris.setAttribute(key, data[key])
    }
})