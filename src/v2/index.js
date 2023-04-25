const tetris = document.getElementById('tetris')
const people = document.getElementById('people')
const vs = document.getElementById('options')
const options = document.querySelectorAll('#options input')
const daynight = document.getElementById('daynight')
const root = document.querySelector(':root')

// 对战模式
document.querySelectorAll('input[name="mode"]').forEach(item => {
    item.addEventListener('click', () => {
        if (item.value === 'single') {
            vs.className = 'disabled'
            for (let item of options) {
                item.disabled = true
            }
            tetris.setAttribute('people', '1')
        } else {
            vs.className = ''
            for (let item of options) {
                item.disabled = false
            }
            tetris.setAttribute('people', people.value)
        }
    })
})

// 对战人数
people.addEventListener('change', () => {
    tetris.setAttribute('people', people.value)
})

// 对战场次
document.querySelectorAll('input[name="games"]').forEach(item => {
    item.addEventListener('click', () => {
        tetris.setAttribute('games', item.value)
    })
})

// 日间/夜间模式
daynight.addEventListener('click', (e) => {
    if (daynight.checked) {
        root.style.setProperty('--color', '#fff')
        root.style.setProperty('--bg', '#000')
    } else {
        root.style.setProperty('--color', '#000')
        root.style.setProperty('--bg', '#fff')
    }
})