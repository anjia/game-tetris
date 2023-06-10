import Tetris from './Tetris.js'

class Z extends Tetris {
    static next = [
        [true, true, false, false],
        [false, true, true, false]
    ]

    constructor(col1 = 4) {
        super([[-1, col1 - 1], [-1, col1], [0, col1], [0, col1 + 1]])

        // 形状类型：实心、空心
        this.type = 'solid'
    }
}

export default Z