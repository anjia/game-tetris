import Base from '../js/CustomBase.js'

class TetrisStrategy extends Base {

    constructor() {
        super()
    }

    set people(x) {
        // 当继承的子，没有该方法时，会调用到父元素
        // console.log('TetrisStrategy people=', x)
    }
    set games(x) { }

    start() { }
    pause() { }
    continue() { }
    reset() { }
    gameover() { }
}

export default TetrisStrategy