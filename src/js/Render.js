import $ from './$.js'

class Render {
    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns

        // 相关 DOM
        this.domGrid = $.getById('grid')
        this.domNext = $.getById('next')
        this.btnStart = $.getById('btn-start')

        // 初始化 UI
        let arr = []
        for (let i = 0; i < this.rows * this.columns; i++) {
            arr.push('<div></div>')
        }
        $.innerHTML(this.domGrid, arr.join(''))
    }

    reset() {
        $.setClass(this.btnStart, '')
    }
    start() {
        $.toggleClass(this.btnStart, 'pause')
    }
    next(name) {
        $.setClass(this.domNext, 'grid shape-' + name)
    }

    updateGrid(data, max = 0) {
        for (let i = max; i < this.rows; i++) {
            const start = i * this.columns
            for (let j = 0; j < this.columns; j++) {
                this.updateCell(start + j, data[i][j])
            }
        }
    }
    updateCell(i, mode) {
        const flag = ['', 'light', 'blink']
        $.setClass(this.domGrid.children[i], flag[mode])
    }
}

export default Render