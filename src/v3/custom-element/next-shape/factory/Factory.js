export default class ShapeFactory {

    constructor() {
        this.list = this.setList()
        this.length = this.list.length
    }

    // 须子类覆盖
    setList() {
        return []
    }

    createShapeList() {
        let result = []
        for (let shape of this.list) {
            result.push(new shape())
        }
        return result
    }

    createShape(name) {
        let shape = null
        if (this.list.includes(name)) {
            shape = new name()  // 其它语言不能这么写么？
        }
        return shape
    }

    // TODO
    // 子类覆盖，用来创建具体的对象
    createShape(name) { }
    // 举例，有啥具体的方法？怎么觉得工厂模式用得...好生硬
    test(name) {
        const shape = this.createShape(name)
        return shape
    }
}