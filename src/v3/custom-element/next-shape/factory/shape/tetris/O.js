import ShapeBase from '../Base.js'

export default class extends ShapeBase {
    static next = [
        [false, true, true, false],
        [false, true, true, false]
    ]
    static type = ''

    constructor(col1 = 4) {
        const col2 = col1 + 1
        super([[-1, col1], [-1, col2], [0, col1], [0, col2]], '')
    }
}