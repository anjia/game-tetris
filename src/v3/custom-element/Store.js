// TODO. Vue 里的是怎么实现的？
class Store {
    static set(key, val) {
        localStorage.setItem(key, val)
    }
    static get(key) {
        return localStorage.getItem(key)
    }

    static get max() {
        return parseInt(this.get('max')) || 0
    }
    static set max(x) {
        return this.set('max', x)
    }

    static get mode() {
        return this.get('mode') || '1'
    }
    static set mode(x) {
        return this.set('mode', x)
    }

    static get people() {
        return this.get('people') || '2'
    }
    static set people(x) {
        return this.set('people', x)
    }

    static get width() {
        return this.get('width') || '50'
    }
    static set width(x) {
        return this.set('width', x)
    }

    static get games() {
        return this.get('games') || '3'
    }
    static set games(x) {
        return this.set('games', x)
    }

    static get night() {
        return this.get('night') || '0'
    }
    static set night(x) {
        return this.set('night', x)
    }
}

export default Store