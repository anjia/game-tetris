export default class RotateBehavior {

    // 旋转矩阵，逆时针旋转 90°
    static #rotateMatrix = [[], [1, 1]]
    static #getFactor(n) {
        if (!this.#rotateMatrix[n]) {
            let factor = []
            for (let i = n - 1; i >= 0; i--) {
                let j = n - 1 - i
                for (let k = 0; k < n; k++) {
                    factor.push([i - k, j - k])
                }
            }
            this.#rotateMatrix[n] = factor
        }
        return this.#rotateMatrix[n]
    }

    static rotate(points) {
        const { n, origin } = this.#getShapeDetail(points)
        const factor = RotateBehavior.#getFactor(n)
        let next = []
        for (let p of points) {
            const dist = (p[0] - origin[0]) * n + (p[1] - origin[1])
            let nextI = p[0] + factor[dist][0]
            let nextJ = p[1] + factor[dist][1]
            next.push([nextI, nextJ])
        }
        return next
    }

    static #getShapeDetail(points) {
        let rows = new Set()
        let cols = new Set()
        for (let p of points) {
            rows.add(p[0])
            cols.add(p[1])
        }

        const n = Math.max(rows.size, cols.size)
        let r = Math.floor(n / 2)
        let center = [RotateBehavior.#getCenterIndex(rows), RotateBehavior.#getCenterIndex(cols)]

        // 修正中心点 center 或半径 r
        if (n % 2) {
            // 奇数时，若行多（中点必然是个点）则修正列号，否则修正行号
            if (rows.size > cols.size) {
                this.#fixCenterIndex(points, center, [rows, cols], 1)
            } else {
                this.#fixCenterIndex(points, center, [rows, cols], 0)
            }
        } else {
            r--
        }

        const origin = [center[0] - r, center[1] - r]
        return { n, origin }
    }

    static #getCenterIndex(set, mode) {
        const n = set.size
        let sum = 0
        for (let num of set) {
            sum += num
        }
        // 默认向下取整（默认向下走，eg. I）
        return mode === 'ceil' ? Math.ceil(sum / n) : Math.floor(sum / n)
    }

    static #fixCenterIndex(points, center, rowcolumn, pos) {
        let left = 0
        let right = 0
        for (let p of points) {
            if (p[pos] <= center[pos]) left++
            else right++
        }
        // < 可覆盖 T L J
        // = 可覆盖 S Z
        if (left <= right) {
            center[pos] = RotateBehavior.#getCenterIndex(rowcolumn[pos], 'ceil')
        }
    }
}