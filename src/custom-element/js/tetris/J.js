import Tetris from '../Tetris.js'

class J extends Tetris {
    static matrix = [
        [1, 1, 1, 0],
        [0, 0, 1, 0]
    ]

    constructor(col1 = 4) {
        super([[-1, col1 - 1], [-1, col1], [-1, col1 + 1], [0, col1 + 1]])
    }
}

export default J