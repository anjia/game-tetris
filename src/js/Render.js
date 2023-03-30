import $ from './$.js'

class Render {
    constructor(option) {
        // 相关 DOM
        this.domGrid = $.getById('grid')
        this.domNext = $.getById('next')
        this.domMax = $.getById('max')
        this.domScore = $.getById('score')
        this.domClearRows = $.getById('clears')
        this.domLevel = $.getById('level')
        this.btnStart = $.getById('btn-start')

        // 接收参数
        this.rows = option.rows
        this.columns = option.columns
        this.next = option.next
        this.max = option.max

        // 初始化 UI
        let arr = []
        for (let i = 0; i < this.rows * this.columns; i++) {
            arr.push('<div></div>')
        }
        $.innerHTML(this.domGrid, arr.join(''))
    }

    set max(x) {
        $.innerHTML(this.domMax, x)
    }
    set score(x) {
        $.innerHTML(this.domScore, x)
    }
    set clearRows(x) {
        $.innerHTML(this.domClearRows, x)
    }
    set level(x) {
        $.innerHTML(this.domLevel, x)
    }
    set next(x) {
        $.setClass(this.domNext, 'grid shape-' + x)
    }

    reset() {
        this.score = 0
        this.clearRows = 0
        this.level = 1
        $.setClass(this.btnStart, '')
    }
    start() {
        $.toggleClass(this.btnStart, 'pause')
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