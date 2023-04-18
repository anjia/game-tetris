import Tetris from './Tetris.js'

class I extends Tetris {
    static matrix = [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
    ]

    constructor(col1 = 4) {
        super([[0, col1 - 1], [0, col1], [0, col1 + 1], [0, col1 + 2]])
    }
}

export default I