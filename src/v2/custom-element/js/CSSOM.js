class CSSOM {
    // TODO. 操作 className 的
    static removeClass(obj, name) {
        let arr = []
        obj.classList.forEach(item => {
            if (item !== name) {
                arr.push(item)
            }
        })
        obj.className = arr.join(' ')
    }

    static addClass(obj, name) {
        // TODO. name 左右去空格
        if (!name) return
        for (let item of obj.classList) {
            if (item === name) {
                return
            }
        }
        obj.className += ' ' + name
    }

    static toggleClass(obj, name) {
        let flag = false
        let newList = []
        for (let item of obj.classList) {
            if (item === name) {
                flag = true
            } else {
                newList.push(item)
            }
        }
        if (flag === false) {
            newList.push(name)
        }
        obj.className = newList.join(' ')
    }

    static setClass(obj, name) {
        obj.className = name
    }
}

export default CSSOM