import './single-mode/index.js'
import './vs-mode/index.js'

class TetrisFactory {

    // 私有变量
    #strategies = new Map()

    constructor() {
        this.#strategies.set('single', Base.create('single-mode'))
        this.#strategies.set('vs', Base.create('vs-mode'))
    }

    getStrategy(people) {
        return (parseInt(people) > 1) ? this.#strategies.get('vs') : this.#strategies.get('single')
    }
}

export default TetrisFactory