export function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

export function getRotateMatrix(from = 2, to = 4) {
    let rotateMatrix = []
    // n*n
    for (let n = from; n <= to; n++) {
        let factor = []
        for (let i = n - 1; i >= 0; i--) {
            let j = n - 1 - i
            for (let k = 0; k < n; k++) {
                factor.push([i - k, j - k])
            }
        }
        rotateMatrix[n] = factor
    }
    return rotateMatrix
}

export function getShapeDetail(points) {
    let rows = new Set()
    let columns = new Set()
    for (let p of points) {
        rows.add(p[0])
        columns.add(p[1])
    }

    const n = Math.max(rows.size, columns.size)
    let r = Math.floor(n / 2)
    let center = [getCenterIndex(rows), getCenterIndex(columns)]

    // 修正中心点 center 或半径 r
    if (n % 2) {
        // 奇数时，若行多（中点必然是个点）则修正列号，否则修正行号
        if (rows.size > columns.size) {
            fixCenterIndex(points, center, [rows, columns], 1)
        } else {
            fixCenterIndex(points, center, [rows, columns], 0)
        }
    } else {
        r--
    }

    const origin = [center[0] - r, center[1] - r]
    return { n, origin }
}
function getCenterIndex(set, mode) {
    const n = set.size
    let sum = 0
    for (let num of set) {
        sum += num
    }
    // 默认向下取整（默认向下走，eg. I）
    return mode === 'ceil' ? Math.ceil(sum / n) : Math.floor(sum / n)
}
function fixCenterIndex(points, center, rowcolumn, pos) {
    let left = 0
    let right = 0
    for (let p of points) {
        if (p[pos] <= center[pos]) left++
        else right++
    }
    // < 可覆盖 T L J
    // = 可覆盖 S Z
    if (left <= right) {
        center[pos] = getCenterIndex(rowcolumn[pos], 'ceil')
    }
}

export function subtract(arr1, arr2) {
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