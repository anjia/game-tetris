import Base from '../Base.js'

import './single-mode/index.js'
import './vs-mode/index.js'

export default class TetrisFactory {

    // 私有变量
    #strategies = new Map()

    constructor() { }

    getStrategy(people) {
        const key = (parseInt(people) > 1) ? 'vs' : 'single'
        if (!this.#strategies.get(key)) {
            this.#strategies.set(key, Base.create(key + '-mode'))
        }
        return this.#strategies.get(key)
    }
}