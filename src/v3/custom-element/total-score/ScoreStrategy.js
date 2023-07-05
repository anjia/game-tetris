import Base from '../js/CustomBase.js'

class ScoreStrategy extends Base {

    // 静态属性
    static #SCORE = [0, 100, 300, 700, 1500]  // 一次性消 1-2-3-4 行时的得分
    static #MAX = 999999                      // 最大得分

    // 私有属性
    #scoreData;

    constructor() {
        super()
        this.scoreElem = Base.create('div')
    }

    // 对外的 API
    clear(lines) {
        const x = this.#scoreData + ScoreStrategy.#SCORE[lines]
        this.#score = x
    }
    reset() {
        this.#score = 0
    }

    // 对子元素的 API
    get score() {
        return this.#scoreData
    }
    set #score(x) {
        if (x > ScoreStrategy.#MAX) {
            x = ScoreStrategy.#MAX
        }
        this.#scoreData = x
        this.scoreElem.innerText = this.showScore(this.score)

        // 策略接口，子类统一实现该接口
        this.update()
    }
    update() { }
    showScore(x) {
        return Base.padNumber(x, 6)
    }
}

export default ScoreStrategy