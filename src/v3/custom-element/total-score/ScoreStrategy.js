import Base from '../js/CustomBase.js'


export default class extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #dataScore;
    #$score = null

    constructor() {
        super()

        this.$score = Base.create('div')


        // 获取属性参数：在 constructor() 中可以获取到，因为是匿名类
    }

    get score() {
        return this.#dataScore
    }
    set score(x) {
        if (x > this.constructor.#MAX) {
            x = this.constructor.#MAX
        }
        this.#dataScore = x
        this.$score.innerText = this.showScore(this.score)

        this.update()
    }

    update() {

    }

    showScore(x) {
        return Base.padNumber(x, 6)
    }

    clear(lines) {
        const x = this.score + this.constructor.#SCORE[lines]
        this.score = x
    }

    reset() {
        this.score = 0
    }
}