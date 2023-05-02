import Shape from './Shape.js'

class Tetris extends Shape {

    // 静态属性
    static next;  // 形状的 next 矩阵

    constructor(points) {
        super(points)

        // 形状类型：''空心, 'solid'实心
        this.type = ''
        this.level = 1
    }

    reset() {
        super.reset()
        this.level = 1
    }

    start(panel) {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && panel.isFilled(0, p[1])) {
                result = false
                break
            }
        }
        return result
    }

    draw(panel) {
        panel.draw(this.points, this.type, this.level)
    }

    merge() {
        let result = true
        for (let p of this.points) {
            if (p[0] < 0) {
                result = false
                break
            }
        }
        return result
    }

    fall(panel) {
        let result = false
        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了或被卡住了，都不能再落了
            if (panel.isFloor(nextI) || panel.isFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = true
            this.#to(next, panel)
        }
        return result
    }

    down(panel) {
        let result = []
        let cur = this.points
        while (true) {
            let next = []
            for (let p of cur) {
                let nextI = p[0] + 1
                let nextJ = p[1]
                if (panel.isUnderFloor(nextI) ||
                    panel.isFilled(nextI, nextJ)) {
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
            this.#to(result, panel)
        }
        return result
    }

    left(panel) {
        return this.#horizon(-1, panel)
    }

    right(panel) {
        return this.#horizon(1, panel)
    }

    rotate(panel) {
        let result = super.rotate(this.points)
        let next = []
        for (let p of result) {
            if (panel.isUnderFloor(p[0]) ||
                panel.isOutWall(p[1]) ||
                panel.isFilled(p[0], p[1])) {
                break
            } else {
                next.push([p[0], p[1]])
            }
        }
        if (next.length === 4) {
            this.#to(next, panel)
            result = next
        }
        return result
    }

    // 私有方法
    #horizon(dx, panel) {
        let result = []
        let next = []
        for (let p of this.points) {
            let nextI = p[0]
            let nextJ = p[1] + dx

            // 若左右到边界了 或左右被卡住了，则左右位置不动
            if (panel.isOutWall(nextJ) || panel.isFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = next
            this.#to(next, panel)
        }
        return result
    }

    #to(next, panel) {
        // 在 this.current 中但不在 next 中的，置灰
        panel.dark(Shape.minus(this.points, next))
        // 在 next 中但不在 this.current 中的，置亮
        panel.draw(Shape.minus(next, this.points), this.type, this.level)
        this.points = next
    }
}

export default Tetris