import Model from './js/Model.js'
import View from '/js/Render.js'
import Controller from './js/Tetris.js'

// 游戏面板 20*10
const panel = {
    rows: 20,
    columns: 10
}

// 俄罗斯方块
const model = new Model(panel)
const view = new View(panel)
const controller = new Controller({
    rows: panel.rows,
    columns: panel.columns,
    model: model,
    view: view
})

// 绑定事件
getById('btn-start').addEventListener('click', (e) => {
    controller.start()
})
getById('btn-replay').addEventListener('click', (e) => {
    controller.reset()
})
getById('btn-right').addEventListener('click', (e) => {
    controller.horizontal(1)
})
getById('btn-left').addEventListener('click', (e) => {
    controller.horizontal(-1)
})
getById('btn-down').addEventListener('click', (e) => {
    controller.down()
})
getById('btn-rotate').addEventListener('click', (e) => {
    controller.rotate()
})

function getById(id) {
    return document.getElementById(id)
}