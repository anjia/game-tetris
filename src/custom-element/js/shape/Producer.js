import All from './all.js'

class Producer {
    constructor() {
        // 实例属性
        this.nameList = []
        this.nextList = []

        for (let i = 0; i < All.length; i++) {
            this.nameList.push(All[i].name)
        }
    }
    next(start = 0) {
        if (start < 0) {
            start = 0
        }
        if (start > this.nextList.length) {
            start = this.nextList.length
        }
        if (start === this.nextList.length) {
            const num = this.#getRandomInt(this.nameList.length)
            this.nextList.push(this.nameList[num])
        }
        console.log(this.nextList, this.nextList[start])
        return new this.nextList[start]()
    }

    #getRandomInt(max) {
        // Math.random() [0, 1)
        return Math.floor(Math.random() * max)
    }
}

export default Producer