class Shape {

    // private fields
    #init = null   // 初始位置

    constructor(points) {
        this.#init = points

        // 实例属性
        this.points = points    // 四个点

        // shape 画板的相关信息
        this.setted = false
        this.rows;
        this.columns;
        this.data;
        this.container;
    }

    set panel(x) {
        if (this.setted) return
        this.setted = true
        this.rows = x.rows
        this.columns = x.columns
        this.data = x.data
        this.container = x.container
        this.maxRow = x.maxRow
    }

    canStart() {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && this.data[p[0]][p[1]] === 1) {
                result = false
                break
            }
        }
        return result
    }

    canFall() {
        let result = {
            msg: '',
            next: null,
            maxRow: this.maxRow,
            fullRows: [],
            data: null
        }

        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了
            if (nextI === this.rows) {
                break
            } else if (this.#isCellFilled(nextI, nextJ)) {
                // 被卡住了，不能再落了
                break
            }
            next.push([nextI, nextJ])
        }

        // 下落正常，返回
        if (next.length === 4) {
            result.msg = 'continue'
            this.points = next
        } else {
            // 不能再落了，则定位在此处
            result.msg = 'done'
            let updateRows = new Set()
            for (let p of this.points) {
                if (p[0] >= 0) {
                    this.data[p[0]][p[1]] = 1
                    updateRows.add(p[0])
                    if (p[0] < this.maxRow) {
                        this.maxRow = p[0]
                    }
                } else {
                    // 形状没有画全
                    result.msg = 'gameover'
                    this.reset()
                    break
                }
            }
            result.maxRow = this.maxRow

            // 判断是否有满行的
            if (result.msg === 'done') {
                for (let row of updateRows) {
                    let j = 0
                    while (j < this.columns && this.#isCellFilled(row, j)) j++
                    if (j === this.columns) {
                        result.fullRows.push(row)
                    }
                }
                // if (result.fullRows.length) {
                //     this.clearRows += result.fullRows.length
                //     this.#clearFullRows(result.fullRows)
                // }
                result.data = this.data
            }
        }

        return result
    }

    #isCellFilled(i, j) {
        return i >= 0 && i < this.rows && j >= 0 && j < this.columns && this.data[i][j] === 1
    }




    draw() {
        for (let p of this.points) {
            if (p[0] >= 0) {
                const i = p[0] * this.columns + p[1]
                this.#updateCell(i, 1)
            }
        }
    }

    #updateCell(i, mode) {
        const flag = ['', 'light', 'blink']
        this.container.children[i].className = flag[mode]
    }

    reset() {
        this.points = this.#init
    }
    left() {

    }
    right() {

    }
    down() {

    }
    rotate() {

    }
}

export default Shape