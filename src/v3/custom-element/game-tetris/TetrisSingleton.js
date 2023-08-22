import Base from '../Base.js'

import './single-mode/index.js'
import './vs-mode/index.js'

export default class TetrisSingleton {

    static #single
    static #vs

    static getTetris(people = 1) {
        let tetris = null
        if (parseInt(people) > 1) {
            if (!this.#vs) {
                this.#vs = Base.create('vs-mode')
            }
            tetris = this.#vs
        } else {
            if (!this.#single) {
                this.#single = Base.create('single-mode')
            }
            tetris = this.#single
        }
        return tetris
    }
}