const mode = document.querySelectorAll('input[name="mode"]')
const people = document.getElementById('people')
const tetris = document.getElementById('tetris')

// 对战模式
for (let item of mode) {
    item.addEventListener('click', () => {
        if (item.value === 'single') {
            people.disabled = true
            tetris.setAttribute('people', '1')
        } else {
            people.disabled = false
            tetris.setAttribute('people', people.value)
        }
    })
}

// 对战人数
people.addEventListener('change', () => {
    tetris.setAttribute('people', people.value)
})