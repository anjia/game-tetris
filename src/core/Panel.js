import ShapeProducer from '../shape/Producer.js'

class Panel {
    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns

        this.maxRow;    // 楼盖的最高行数

        // 申请空间
        this.data = new Array(this.rows)
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = new Array(this.columns)
        }

        this.domGrid = document.getElementById('panel')

        // 形状
        const col2 = parseInt(this.columns / 2)
        const col1 = col2 - 1
        this.shapeProducer = new ShapeProducer(col1, col2)
    }
    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = 0
            }
        }
    }
    render() {
        let arr = []
        for (let i = 0; i < this.rows * this.columns; i++) {
            arr.push('<div></div>')
        }
        this.domGrid.innerHTML = arr.join('')

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



    subtract(arr1, arr2) {
        return subtract(arr1, arr2)
    }
    subtract(arr1, arr2) {
        // arr1 - arr2
        let result = []
        for (let p1 of arr1) {
            let exist = false
            for (let p2 of arr2) {
                if (p1[0] === p2[0] && p1[1] === p2[1]) {
                    exist = true
                    break
                }
            }
            if (!exist) result.push(p1)
        }
        return result
    }

    canStart(points) {
        let result = true
        for (let p of points) {
            if (p[0] === 0 && this.data[p[0]][p[1]] === 1) {
                result = false
                this.reset()
                break
            }
        }
        return result
    }
    canFall(points) {
        let result = {
            msg: '',
            next: null,
            maxRow: this.maxRow,
            fullRows: [],
            data: null
        }

        let next = []
        for (let p of points) {
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
            result.next = next
        } else {
            // 不能再落了，则定位在此处
            result.msg = 'done'
            let updateRows = new Set()
            for (let p of points) {
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
                if (result.fullRows.length) {
                    this.clearRows += result.fullRows.length
                    this.#clearFullRows(result.fullRows)
                }
                result.data = this.data
            }
        }

        return result
    }


    /**
     * private methods
     */
    #isCellFilled(i, j) {
        return i >= 0 && i < this.rows && j >= 0 && j < this.columns && this.data[i][j] === 1
    }
    #clearFullRows(fullRows) {
        // 原地排序，从小-大
        fullRows.sort((a, b) => {
            if (a > b) return 1
            else if (a < b) return -1
            return 0
        })
        // 从小到大，依次消除
        for (let row of fullRows) {
            for (let i = row; i >= this.maxRow; i--) {
                const srcI = i - 1
                for (let j = 0; j < this.columns; j++) {
                    this.data[i][j] = ((srcI >= 0 && srcI >= this.maxRow) ? this.data[srcI][j] : 0)
                }
            }
            this.maxRow++

            // console.log('消行', row)
            // console.log(this.data)
            // console.log('盖楼最高层（现在）', this.maxRow)
        }
    }

}

export default Panel