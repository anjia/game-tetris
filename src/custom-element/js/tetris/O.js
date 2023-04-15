import Tetris from '../Tetris.js'

class O extends Tetris {
    static matrix = [
        [0, 1, 1, 0],
        [0, 1, 1, 0]
    ]

    constructor(col1 = 4) {
        const col2 = col1 + 1
        super([[-1, col1], [-1, col2], [0, col1], [0, col2]])
    }
}

export default O