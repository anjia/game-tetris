import Context from './Context.js'

class Tetris {
    constructor(options) {
        this.rows = options.rows
        this.columns = options.columns
        this.mode = options.mode

        this.person1 = new Context({
            rows: this.rows,
            columns: this.columns,
            id: 'person1'
        })
        this.person2 = new Context({
            rows: this.rows,
            columns: this.columns,
            id: 'person2'
        })
    }

    // setter 和 普通属性有啥区别？
    // setter 更灵活，里面可以写更多逻辑
    set mode(x) {
        if (x === 1) {

        } else if (x === 2) {
            this.person2.reset()
        }
    }
    set width(x) {
    }
}

export default Tetris