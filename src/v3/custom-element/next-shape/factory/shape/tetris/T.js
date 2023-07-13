import Tetris from './Tetris.js'

class T extends Tetris {
    static next = [
        [false, true, false, false],
        [true, true, true, false]
    ]

    constructor(col1 = 4) {
        super([[-1, col1], [0, col1 - 1], [0, col1], [0, col1 + 1]])
    }
}

export default T