import ShapeFactory from './Factory.js'

// import Triangle from './shape/trick/Triangle.js'

export default class TrickFactory extends ShapeFactory {
    constructor() {
        super()
    }

    setList() {
        return []
    }
}