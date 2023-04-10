import Shape from './Shape.js'

class T extends Shape {
    static matrix = [
        [0, 1, 0, 0],
        [1, 1, 1, 0]
    ]

    constructor(col1 = 4) {
        super([[-1, col1], [0, col1 - 1], [0, col1], [0, col1 + 1]])
    }
}

export default T