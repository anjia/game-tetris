import { getRotateMatrix, getRandomInt, getShapeDetail, subtract } from './Utility.js'

class Model {
    // 旋转矩阵，逆时针旋转 90°
    static rotateMatrix = getRotateMatrix()

    // 形状的初始位置
    static #getShapes(col1, col2) {
        return [
            {
                name: 'O',
                points: [[-1, col1], [-1, col2], [0, col1], [0, col2]]
            },
            {
                name: 'I',
                points: [[-3, col1], [-2, col1], [-1, col1], [0, col1]]
            },
            {
                name: 'T',
                points: [[-2, col1], [-1, col1], [-1, col2], [0, col1]]
            },
            {
                name: 'L',
                points: [[-2, col1], [-1, col1], [0, col1], [0, col2]]
            },
            {
                name: 'J',
                points: [[-2, col2], [-1, col2], [0, col1], [0, col2]]
            },
            {
                name: 'S',
                points: [[-2, col1], [-1, col1], [-1, col2], [0, col2]]
            },
            {
                name: 'Z',
                points: [[-2, col2], [-1, col1], [-1, col2], [0, col1]]
            }
        ]
    }

    constructor(option) {
        // 接收参数
        this.rows = option.rows
        this.columns = option.columns

        const col2 = parseInt(this.columns / 2)
        this.shapes = this.constructor.#getShapes(col2 - 1, col2)

        // 申请空间
        this.data = new Array(this.rows)
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = new Array(this.columns)
        }

        // 其它实例数据
        this.maxRow;    // 楼盖的最高行数
        this.clearRows; // 消除的行数

        // 初始化（重置）数据
        this.reset()
    }

    get next() {
        const next = getRandomInt(this.shapes.length)
        return this.shapes[next]
    }

    reset() {
        // grid data 全部填充 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = 0
            }
        }
        // 其它实例数据
        this.maxRow = this.rows - 1
        this.clearRows = 0
    }

    getHorizontalPos(points, dx) {
        let result = {
            msg: 'fail',
            next: []
        }
        let next = []
        for (let p of points) {
            let nextI = p[0]
            let nextJ = p[1] + dx

            // 若左右到边界了 或左右被卡住了，则左右位置不动
            if (nextJ < 0 || nextJ >= this.columns || this.#isCellFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result.msg = 'success'
            result.next = next
        }
        return result
    }
    getDownPos(points) {
        let result = {
            msg: 'fail',
            next: []
        }
        let cur = points
        while (true) {
            let next = []
            for (let p of cur) {
                let nextI = p[0] + 1
                let nextJ = p[1]
                if (nextI >= this.rows || this.#isCellFilled(nextI, nextJ)) {
                    break
                }
                next.push([nextI, nextJ])
            }
            if (next.length === 4) {
                cur = next
                result.msg = 'success'
                result.next = next
            } else {
                break
            }
        }
        return result
    }
    getRotatePos(points) {
        let result = {
            msg: 'fail',
            next: []
        }
        const { n, origin } = getShapeDetail(points)
        const factor = this.constructor.rotateMatrix[n]
        let next = []
        for (let p of points) {
            const dist = (p[0] - origin[0]) * n + (p[1] - origin[1])
            let nextI = p[0] + factor[dist][0]
            let nextJ = p[1] + factor[dist][1]

            if (nextI >= this.rows || nextJ < 0 || nextJ >= this.columns || this.#isCellFilled(nextI, nextJ)) {
                break
            } else {
                next.push([nextI, nextJ])
            }
        }
        if (next.length === 4) {
            result.msg = 'success'
            result.next = next
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

    subtract(arr1, arr2) {
        return subtract(arr1, arr2)
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

export default Model