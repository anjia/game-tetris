import Shape from './Shape.js'

class Tetris extends Shape {
    // 静态属性
    static next;  // 形状的 next 矩阵

    // TODO. 改成静态私有属性
    #setted = false   // 画板的信息是否初始化
    #render = 20;      // 画板的信息，来自 <grid-panel>

    constructor(points) {
        super(points)
    }

    set render(x) {
        if (this.#setted) return
        this.#setted = true
        this.#render = x
    }

    start() {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && this.#render.isCellFilled(0, p[1])) {
                result = false
                break
            }
        }
        if (result) {
            this.#render.draw(this.points)
        }
        return result
    }

    fall() {
        let result = false
        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了
            if (this.#render.isFloor(nextI)) {
                break
            } else if (this.#render.isCellFilled(nextI, nextJ)) {
                // 被卡住了，不能再落了
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = true
            this.#to(next)
        }
        return result
    }

    down() {
        let result = []
        let cur = this.points
        while (true) {
            let next = []
            for (let p of cur) {
                let nextI = p[0] + 1
                let nextJ = p[1]
                if (this.#render.isUnderFloor(nextI) ||
                    this.#render.isCellFilled(nextI, nextJ)) {
                    break
                }
                next.push([nextI, nextJ])
            }
            if (next.length === 4) {
                cur = next
                result = next
            } else {
                break
            }
        }
        if (result.length) {
            this.#to(result)
        }
        return result
    }

    left() {
        return this.#horizon(-1)
    }

    right() {
        return this.#horizon(1)
    }

    rotate() {
        let result = Shape.rotate(this.points)
        let next = []
        for (let p of result) {
            if (this.#render.isUnderFloor(p[0]) ||
                this.#render.isOutWall(p[1]) ||
                this.#render.isCellFilled(p[0], p[1])) {
                break
            } else {
                next.push([p[0], p[1]])
            }
        }
        if (next.length === 4) {
            this.#to(next)
            result = next
        }
        return result
    }

    merged() {
        let result = true
        for (let p of this.points) {
            if (p[0] < 0) {
                result = false
                break
            } else {
                this.#render.fill(p[0], p[1])  // merge data
            }
        }
        if (result) {
            this.#render.draw(this.points)  // merge ui
        }
        return result
    }

    // 私有方法
    #horizon(dx) {
        let result = []
        let next = []
        for (let p of this.points) {
            let nextI = p[0]
            let nextJ = p[1] + dx

            // 若左右到边界了 或左右被卡住了，则左右位置不动
            if (this.#render.isOutWall(nextJ) || this.#render.isCellFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = next
            this.#to(next)
        }
        return result
    }

    #to(next) {
        // 在 this.current 中但不在 next 中的，置灰
        this.#render.renderCells(Shape.subtract(this.points, next), 0)
        // 在 next 中但不在 this.current 中的，置亮
        this.#render.renderCells(Shape.subtract(next, this.points), 1)
        this.points = next
    }
}

export default Tetris