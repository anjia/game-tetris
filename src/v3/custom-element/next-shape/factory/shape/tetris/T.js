import ShapeBase from '../Base.js'

export default class extends ShapeBase {
    static next = [
        [false, true, false, false],
        [true, true, true, false]
    ]
    static type = ''

    constructor(col1 = 4) {
        super([[-1, col1], [0, col1 - 1], [0, col1], [0, col1 + 1]])
    }
}