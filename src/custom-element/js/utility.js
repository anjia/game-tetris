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