import ShapeFactory from './Factory.js'

import O from './shape/tetris/O.js'
import I from './shape/tetris/I.js'
import T from './shape/tetris/T.js'
import J from './shape/tetris/J.js'
import L from './shape/tetris/L.js'
import S from './shape/tetris/S.js'
import Z from './shape/tetris/Z.js'

export default class TetrisFactory extends ShapeFactory {

    constructor() {
        super()
    }

    setList() {
        return [O, I, T, J, L, S, Z]
    }
}