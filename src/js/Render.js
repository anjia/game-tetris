class Render {

    static #toggleClass(obj, name) {
        let flag = false
        let newList = []
        for (let item of obj.classList) {
            if (item === name) {
                flag = true
            } else {
                newList.push(item)
            }
        }
        if (flag === false) {
            newList.push(name)
        }
        obj.className = newList.join(' ')
    }

    constructor(option) {
        // 相关 DOM
        this.domGrid = document.getElementById('panel')
        this.domNext = document.getElementById('next')
        this.domMax = document.getElementById('max')
        this.domScore = document.getElementById('score')
        this.domClearRows = document.getElementById('clears')
        this.domLevel = document.getElementById('level')
        this.btnStart = document.getElementById('btn-start')

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
        this.domGrid.innerHTML = arr.join('')
    }

    set max(x) {
        this.domMax.innerText = x
    }
    set score(x) {
        this.domScore.innerText = x
    }
    set clearRows(x) {
        this.domClearRows.innerText = x
    }
    set level(x) {
        this.domLevel.innerText = x
    }
    set next(x) {
        this.domNext.className = 'grid shape-' + x
    }

    reset() {
        this.score = 0
        this.clearRows = 0
        this.level = 1
        this.btnStart.className = ''
    }
    start() {
        this.constructor.#toggleClass(this.btnStart, 'pause')
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
        this.domGrid.children[i].className = flag[mode]
    }
}

export default Render