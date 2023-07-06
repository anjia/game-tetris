
// TODO. 观察者模式，是否需要搞个统一的“接口”？
export default class ScoreObservable {
    constructor() {
        this.observers = []
    }

    registerObserver(o) {
        console.log('\n~~~ ScoreObservable, [].push()', o, ' score=', o.score)
        // 插入排序：大-小，由后向前遍历
        this.observers.push(o)
        const index = this.insertOrder(0, this.observers.length - 1)
        console.log('this.observers = ', this.observers, ' length=', this.observers.length)
        return index
    }

    removeObserver(o) {
        // this.observers.delete(o)
    }

    // notifyObserver() {
    //     for (let o of this.observers) {
    //         o.update()
    //     }
    // }
    scoreChanged(index) {
        console.log(`第${index}名值有变`)

        // 先排序
        this.insertOrder(0, index)
        // 获取前两名的 score
        const firstScore = this.observers[0].score
        const secondScore = this.observers[1].score
        // 依次通知它们值有变
        this.observers[0].vs = secondScore
        this.observers[0].order = 0
        for (let i = 1; i < this.observers.length; i++) {
            this.observers[i].order = 1
            this.observers[i].vs = firstScore
        }
    }

    insertOrder(left, right) {
        // debugger
        let index = right
        while (index > left) {
            let target = this.observers[index]
            let item = this.observers[index - 1]
            if (target.score > item.score) {
                let temp = this.observers[index - 1]
                this.observers[index - 1] = target
                this.observers[index] = temp
                index--
            } else {
                break
            }
        }
        return index
    }
}