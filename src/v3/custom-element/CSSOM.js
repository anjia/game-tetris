// TODO. 将所有操作 className 的都封装在这里？
export function addClass(obj, names) {
    if (typeof names === 'string') {
        add(obj, names)
    } else {
        for (let name of names) {
            add(obj, name)
        }
    }
}

function add(obj, name) {
    // TODO. name 左右去空格
    for (let item of obj.classList) {
        if (item === name) {
            return
        }
    }
    obj.className += ' ' + name
}

export function removeClass(obj, name) {
    let arr = []
    obj.classList.forEach(item => {
        if (item !== name) {
            arr.push(item)
        }
    })
    obj.className = arr.join(' ')
}

export function removeClassStart(obj, name) {
    let arr = []
    obj.classList.forEach(item => {
        if (item.indexOf(name) === -1) {
            arr.push(item)
        }
    })
    obj.className = arr.join(' ')
}

export function toggleClass(obj, name) {
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

export function setClass(obj, name) {
    obj.className = name
}