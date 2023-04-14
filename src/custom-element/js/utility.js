export function createLink(href) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', href)
    return link
}

export function showNumber(num, len) {
    return String(num).padStart(len, '0')
}

export function getRandomInt(max) {
    // Math.random() [0, 1)
    return Math.floor(Math.random() * max)
}

export function subtract(arr1, arr2) {
    // arr1 - arr2
    let result = []
    for (let p1 of arr1) {
        let exist = false
        for (let p2 of arr2) {
            if (p1[0] === p2[0] && p1[1] === p2[1]) {
                exist = true
                break
            }
        }
        if (!exist) result.push(p1)
    }
    return result
}