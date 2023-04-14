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

    // // private methods
    // #getHorizontalPos(points, dx) {
    //     let result = {
    //         msg: 'fail',
    //         next: []
    //     }
    //     let next = []
    //     for (let p of points) {
    //         let nextI = p[0]
    //         let nextJ = p[1] + dx

    //         // 若左右到边界了 或左右被卡住了，则左右位置不动
    //         if (nextJ < 0 || nextJ >= this.columns || this.#isCellFilled(nextI, nextJ)) {
    //             break
    //         }
    //         next.push([nextI, nextJ])
    //     }
    //     if (next.length === 4) {
    //         result.msg = 'success'
    //         result.next = next
    //     }
    //     return result
    // }
    // #getDownPos(points) {
    //     let result = {
    //         msg: 'fail',
    //         next: []
    //     }
    //     let cur = points
    //     while (true) {
    //         let next = []
    //         for (let p of cur) {
    //             let nextI = p[0] + 1
    //             let nextJ = p[1]
    //             if (nextI >= this.rows || this.#isCellFilled(nextI, nextJ)) {
    //                 break
    //             }
    //             next.push([nextI, nextJ])
    //         }
    //         if (next.length === 4) {
    //             cur = next
    //             result.msg = 'success'
    //             result.next = next
    //         } else {
    //             break
    //         }
    //     }
    //     return result
    // }
    // #getRotatePos(points) {
    //     let result = {
    //         msg: 'fail',
    //         next: []
    //     }
    //     const { n, origin } = getShapeDetail(points)
    //     const factor = this.constructor.rotateMatrix[n]
    //     let next = []
    //     for (let p of points) {
    //         const dist = (p[0] - origin[0]) * n + (p[1] - origin[1])
    //         let nextI = p[0] + factor[dist][0]
    //         let nextJ = p[1] + factor[dist][1]

    //         if (nextI >= this.rows || nextJ < 0 || nextJ >= this.columns || this.#isCellFilled(nextI, nextJ)) {
    //             break
    //         } else {
    //             next.push([nextI, nextJ])
    //         }
    //     }
    //     if (next.length === 4) {
    //         result.msg = 'success'
    //         result.next = next
    //     }
    //     return result
    // }


    // // rotateMatrix
    // #getRotateMatrix(from = 2, to = 4) {
    //     let rotateMatrix = []
    //     // n*n
    //     for (let n = from; n <= to; n++) {
    //         let factor = []
    //         for (let i = n - 1; i >= 0; i--) {
    //             let j = n - 1 - i
    //             for (let k = 0; k < n; k++) {
    //                 factor.push([i - k, j - k])
    //             }
    //         }
    //         rotateMatrix[n] = factor
    //     }
    //     return rotateMatrix
    // }
    // #getShapeDetail(points) {
    //     let rows = new Set()
    //     let columns = new Set()
    //     for (let p of points) {
    //         rows.add(p[0])
    //         columns.add(p[1])
    //     }

    //     const n = Math.max(rows.size, columns.size)
    //     let r = Math.floor(n / 2)
    //     let center = [getCenterIndex(rows), getCenterIndex(columns)]

    //     // 修正中心点 center 或半径 r
    //     if (n % 2) {
    //         // 奇数时，若行多（中点必然是个点）则修正列号，否则修正行号
    //         if (rows.size > columns.size) {
    //             fixCenterIndex(points, center, [rows, columns], 1)
    //         } else {
    //             fixCenterIndex(points, center, [rows, columns], 0)
    //         }
    //     } else {
    //         r--
    //     }

    //     const origin = [center[0] - r, center[1] - r]
    //     return { n, origin }
    // }
    // #getCenterIndex(set, mode) {
    //     const n = set.size
    //     let sum = 0
    //     for (let num of set) {
    //         sum += num
    //     }
    //     // 默认向下取整（默认向下走，eg. I）
    //     return mode === 'ceil' ? Math.ceil(sum / n) : Math.floor(sum / n)
    // }
    // #fixCenterIndex(points, center, rowcolumn, pos) {
    //     let left = 0
    //     let right = 0
    //     for (let p of points) {
    //         if (p[pos] <= center[pos]) left++
    //         else right++
    //     }
    //     // < 可覆盖 T L J
    //     // = 可覆盖 S Z
    //     if (left <= right) {
    //         center[pos] = getCenterIndex(rowcolumn[pos], 'ceil')
    //     }
    // }
}

export default Shape