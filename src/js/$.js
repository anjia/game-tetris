function getById(id) {
    return document.getElementById(id)
}

function innerHTML(obj, str) {
    obj.innerHTML = str
}

function innerText(obj, str) {
    obj.innerText = str
}

function toggleClass(obj, name) {
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
// function addClass(obj, name) {
//     obj.className = name
// }
function setClass(obj, name) {
    obj.className = name
}

export default { getById, innerText, innerHTML, toggleClass, setClass }