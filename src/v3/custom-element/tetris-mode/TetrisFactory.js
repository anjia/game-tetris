import Base from '../Base.js'

// TODO. 这就相当于接口或抽象类？确保不能被 new
// TODO. 测试两个子类的功能
// 抽象工厂模式
export default class TetrisStrategy extends Base {

    // // 私有变量
    // #context = [];    // <tetris-context>[]

    constructor() {
        super()
        // TODO. 如何让 context 封装起来，又保证它只能是子能使用。
        // TODO. 如何访问父元素的私有变量
        this.context = []    // <tetris-context>[]
    }

    // // 工厂方法 vs 直接在构造函数里写
    // createContextList() {
    //     return []
    // }

    /**
     * 当继承的子，没有该方法时，会调用到父元素
     * 当继承的子，同一属性，get和set需同时覆盖（即子要有都有，要没都没）
     */
    get people() { }
    set people(x) { }
    set games(x) { }

    start() {
        console.log(this.context)
        for (let i = 0; i < this.people; i++) {
            this.context[i].start()
        }
    }

    pause() {
        for (let i = 0; i < this.people; i++) {
            this.context[i].pause()
        }
    }

    continue() {
        for (let i = 0; i < this.people; i++) {
            this.context[i].continue()
        }
    }

    reset() { }
    gameover() { }
}