import ShapeBase from '../Base.js'

export default class extends ShapeBase {
    static next = [
        [false, false, false, false],
        [true, true, true, true]
    ]
    static type = ''

    constructor(col1 = 4) {
        super([[0, col1 - 1], [0, col1], [0, col1 + 1], [0, col1 + 2]])
    }
}