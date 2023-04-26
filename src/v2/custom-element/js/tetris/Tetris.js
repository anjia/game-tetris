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

    start(render) {
        let result = true
        for (let p of this.points) {
            if (p[0] === 0 && render.isFilled(0, p[1])) {
                result = false
                break
            }
        }
        return result
    }

    draw(render) {
        render.draw(this.points, this.type, this.level)
    }

    merge(render) {
        let result = true
        let fullRows = []
        for (let p of this.points) {
            if (p[0] < 0) {
                result = false
                break
            }
        }
        if (result) {
            render.merge(this.points)  // merge data
            render.draw(this.points, this.type, this.level)   // merge ui
            fullRows = render.calculateFullRows(this.points)  // 计算是否有满行
        }
        return { result, fullRows }
    }

    fall(render) {
        let result = false
        let next = []
        for (let p of this.points) {
            let nextI = p[0] + 1
            let nextJ = p[1]

            // 降落到底了或被卡住了，都不能再落了
            if (render.isFloor(nextI) || render.isFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = true
            this.#to(next, render)
        }
        return result
    }

    down(render) {
        let result = []
        let cur = this.points
        while (true) {
            let next = []
            for (let p of cur) {
                let nextI = p[0] + 1
                let nextJ = p[1]
                if (render.isUnderFloor(nextI) ||
                    render.isFilled(nextI, nextJ)) {
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
            this.#to(result, render)
        }
        return result
    }

    left(render) {
        return this.#horizon(-1, render)
    }

    right(render) {
        return this.#horizon(1, render)
    }

    rotate(render) {
        let result = super.rotate(this.points)
        let next = []
        for (let p of result) {
            if (render.isUnderFloor(p[0]) ||
                render.isOutWall(p[1]) ||
                render.isFilled(p[0], p[1])) {
                break
            } else {
                next.push([p[0], p[1]])
            }
        }
        if (next.length === 4) {
            this.#to(next, render)
            result = next
        }
        return result
    }

    // 私有方法
    #horizon(dx, render) {
        let result = []
        let next = []
        for (let p of this.points) {
            let nextI = p[0]
            let nextJ = p[1] + dx

            // 若左右到边界了 或左右被卡住了，则左右位置不动
            if (render.isOutWall(nextJ) || render.isFilled(nextI, nextJ)) {
                break
            }
            next.push([nextI, nextJ])
        }
        if (next.length === 4) {
            result = next
            this.#to(next, render)
        }
        return result
    }

    #to(next, render) {
        // 在 this.current 中但不在 next 中的，置灰
        render.renderPoints(Shape.minus(this.points, next), 'dark', this.type, this.level)
        // 在 next 中但不在 this.current 中的，置亮
        render.renderPoints(Shape.minus(next, this.points), 'draw', this.type, this.level)
        this.points = next
    }
}

export default Tetris