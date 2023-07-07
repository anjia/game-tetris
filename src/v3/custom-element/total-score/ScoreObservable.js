// TODO. 观察者模式，是否需要搞个统一的“接口”？
export default class ScoreObservable {

    // 私有变量
    #observers = []  // 被观察者列表
    #ordered = []    // 辅助数组：有序的下标数组，由大到小

    constructor() { }

    registerObserver(o) {
        this.#observers.push(o)
        this.#ordered.push(this.#ordered.length)
        return this.insertedOrder(0, this.#observers.length - 1)
    }

    removeObserver(o) {
        // this.#observers.delete(o)
    }

    notifyObserver() {
        for (let i in this.#ordered) {
            const observer = this.#observers[this.#ordered[i]]
            observer.update(i)
        }
    }

    dataChanged(index) {
        console.log(`第${index}名值有变`)
        this.insertedOrder(0, index)  // 先排序
        this.notifyObserver()         // 后通知
    }

    get first() {
        return this.#observers[this.#ordered[0]].score
    }

    get second() {
        return this.#observers[this.#ordered[1]].score
    }

    /**
     * 插入排序：从大到小，插入元素为[right]
     */
    insertedOrder(left, right) {
        let pos = right
        while (pos > left) {
            const target = this.#observers[this.#ordered[pos]]
            const item = this.#observers[this.#ordered[pos - 1]]
            if (target.score > item.score) {
                let temp = this.#ordered[pos - 1]
                this.#ordered[pos - 1] = this.#ordered[pos]
                this.#ordered[pos] = temp
                pos--
            } else {
                break
            }
        }
        return pos
    }
}