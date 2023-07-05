
// TODO. 观察者模式，是否需要搞个统一的“接口”？
class ScoreObservable {
    constructor() {
        this.observers = []
    }

    registerObserver(o) {
        this.observers.push(o)
    }

    removeObserver(o) {
        this.observers.delete(o)
    }

    notifyObserver() {
        for (let o of this.observers) {
            o.update()
        }
    }
}