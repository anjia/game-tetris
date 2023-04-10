class Shape {
    #init = null;

    constructor(points) {
        this.points = points    // 四个点
        this.#init = points     // 初始位置
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