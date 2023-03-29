import Tetirs from './js/Tetris.js'

// 游戏面板 20*10
const rows = 20
const columns = 10

// 俄罗斯方块
const tetirs = new Tetirs({ rows, columns })

// 绑定事件
getById('btn-start').addEventListener('click', (e) => {
    tetirs.start()
})
getById('btn-replay').addEventListener('click', (e) => {
    tetirs.reset()
})
getById('btn-right').addEventListener('click', (e) => {
    tetirs.horizontal(1)
})
getById('btn-left').addEventListener('click', (e) => {
    tetirs.horizontal(-1)
})
getById('btn-down').addEventListener('click', (e) => {
    tetirs.down()
})
getById('btn-rotate').addEventListener('click', (e) => {
    tetirs.rotate()
})

function getById(id) {
    return document.getElementById(id)
}