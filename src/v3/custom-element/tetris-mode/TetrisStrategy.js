import Base from '../Base.js'

// TODO. 这就相当于接口或抽象类？确保不能被 new
// TODO. 测试两个子类的功能
// TODO. 严格来说不算抽象工厂，因为除了一系列 createXXX 不同之外，还有一些行为也是不同的
//       这就意味着，没法“面向抽象编程”了，也就是没法依赖倒置了
//       所以还是策略模式更合适...（策略模式更小巧更灵活，粒度也细）
// TODO. 严格来说也不算工厂方法，因为 createContextList() 拆不纯
//       一是涉及shadow的样式+自定义元素，二是列表个数可以动态修改（多人时people）
// TODO. 所以就是：单例模式，配上n个策略模式
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