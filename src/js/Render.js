import $ from './$.js'

class Render {
    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns

        // 实例数据
        this.dataNext = '';
        this.dataLevel = 1;
        this.dataScore = 0;
        this.dataClearRows = 0;
        this.dataMax = 0;

        // 相关 DOM
        this.domGrid = $.getById('grid')
        this.domNext = $.getById('next')
        this.domMax = $.getById('max')
        this.domScore = $.getById('score')
        this.domClearRows = $.getById('clears')
        this.domLevel = $.getById('level')
        this.btnStart = $.getById('btn-start')

        // 初始化 UI
        let arr = []
        for (let i = 0; i < this.rows * this.columns; i++) {
            arr.push('<div></div>')
        }
        $.innerHTML(this.domGrid, arr.join(''))
    }

    set next(x) {
        if (this.dataNext !== x) {
            $.setClass(this.domNext, 'grid shape-' + x)
            this.dataNext = x
        }
    }
    set level(x) {
        if (this.dataLevel !== x) {
            $.innerHTML(this.domLevel, x)
            this.dataLevel = x
        }
    }
    set score(x) {
        if (this.dataScore !== x) {
            $.innerHTML(this.domScore, x)
            this.dataScore = x
        }
    }
    set clearRows(x) {
        if (this.dataClearRows !== x) {
            $.innerHTML(this.domClearRows, x)
            this.dataClearRows = x
        }
    }
    set max(x) {
        if (this.dataMax !== x) {
            $.innerHTML(this.domMax, x)
            this.dataMax = x
        }
    }

    reset() {
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