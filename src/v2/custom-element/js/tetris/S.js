import Tetris from './Tetris.js'

class S extends Tetris {
    static next = [
        [false, true, true, false],
        [true, true, false, false]
    ]

    constructor(col1 = 4) {
        super([[-1, col1], [-1, col1 + 1], [0, col1 - 1], [0, col1]])

        // 形状类型：实心、空心
        this.type = 'solid'
    }
}

export default S