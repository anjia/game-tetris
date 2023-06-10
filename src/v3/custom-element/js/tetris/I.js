import Tetris from './Tetris.js'

class I extends Tetris {
    static next = [
        [false, false, false, false],
        [true, true, true, true]
    ]

    constructor(col1 = 4) {
        super([[0, col1 - 1], [0, col1], [0, col1 + 1], [0, col1 + 2]])
    }
}

export default I