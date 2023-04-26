import Tetris from './Tetris.js'

class L extends Tetris {
    static next = [
        [0, 0, 1, 0],
        [1, 1, 1, 0]
    ]

    constructor(col1 = 4) {
        super([[-1, col1 + 1], [0, col1 - 1], [0, col1], [0, col1 + 1]])

        // 形状类型：实心、空心
        this.type = 'solid'
    }
}

export default L