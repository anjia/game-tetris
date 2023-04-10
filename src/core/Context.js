import Panel from "./Panel.js";

class Context {

    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns
        this.id = option.id

        this.panel = new Panel({
            rows: this.rows,
            columns: this.columns
        })









        this.btnStart = document.getElementById('btn-start')
    }
    reset() {
        this.panel.reset()
        this.maxRow = this.rows - 1
        this.clearRows = 0

        this.score = 0
        this.clearRows = 0
        this.level = 1
        this.btnStart.className = ''
    }
    start() {
        this.constructor.#toggleClass(this.btnStart, 'pause')
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


    toggleClass(obj, name) {
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
}

export default Context