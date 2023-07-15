import ShapeBase from '../Base.js'

export default class extends ShapeBase {
    static next = [
        [true, true, false, false],
        [false, true, true, false]
    ]
    static type = 'solid'

    constructor(col1 = 4) {
        super([[-1, col1 - 1], [-1, col1], [0, col1], [0, col1 + 1]])
    }
}