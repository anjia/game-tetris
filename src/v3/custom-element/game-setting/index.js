import Store from '../Store.js'
import Base from '../Base.js'

customElements.define('game-setting', class extends Base {

    // 私有变量，均为 DOM
    #root;
    #modeList;
    #people;
    #gameList;
    #width;
    #night;

    #settingData = {}
    #eventSetting = new CustomEvent('attributesChanged', {
        bubbles: true,
        detail: () => this.#settingData
    })

    constructor() {
        super()

        this.#root = document.querySelector(':root')  // TODO. 不应该是 shadow root 么？
        this.#modeList = [
            Base.create('input', {
                'type': 'radio',
                'name': 'mode',
                'id': 'single',
                'value': '1'
            }),
            Base.create('input', {
                'type': 'radio',
                'name': 'mode',
                'id': 'vs',
                'value': '2'
            })
        ]
        this.#people = Base.create('input', {
            'type': 'number',
            'value': Store.people,
            'min': '2',
            'max': '10',
            'disabled': true
        })
        this.#gameList = [
            Base.create('input', {
                'type': 'radio',
                'name': 'games',
                'id': 'games3',
                'value': '3',
                'disabled': true
            }),
            Base.create('input', {
                'type': 'radio',
                'name': 'games',
                'id': 'games5',
                'value': '5',
                'disabled': true
            })
        ]
        this.#width = Base.create('input', {
            'type': 'range',
            'value': Store.width,
            'min': '10',
            'max': '90',
            'disabled': true
        })
        this.#night = Base.create('input', {
            'type': 'checkbox',
            'name': 'night',
            'id': 'night'
        })

        // 构建 DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-setting/index.css'))

        shadow.appendChild(Base.create('div', {}, [
            this.#modeList[0],
            Base.create('label', { 'text': '单人模式', 'for': 'single' }),
            this.#modeList[1],
            Base.create('label', { 'text': '对战模式', 'for': 'vs' })
        ]))
        this.options = Base.create('div', { 'id': 'options', 'class': 'disabled' }, [
            Base.create('div', {}, [this.#people, Base.createText('人')]),
            Base.create('div', {}, [this.#width]),
            Base.create('div', {}, [
                this.#gameList[0],
                Base.create('label', {
                    'text': '三局两胜',
                    'for': 'games3'
                }),
                Base.create('br'),
                this.#gameList[1],
                Base.create('label', {
                    'text': '五局三胜',
                    'for': 'games5'
                })
            ])
        ])
        shadow.appendChild(this.options)
        shadow.appendChild(Base.create('div', {}, [this.#night, Base.create('label', { 'text': '夜间', 'for': 'night' })]))

        // 监听事件
        this.#addEventListener()

        this.#init()
    }

    set #setting(obj) {
        this.#settingData = obj
        this.dispatchEvent(this.#eventSetting)
    }

    set #vs(flag) {
        this.options.className = flag ? '' : 'disabled'
        const disabled = !flag
        this.#people.disabled = disabled
        this.#gameList.forEach(item => item.disabled = disabled)
        this.#width.disabled = disabled
    }

    #init() {
        if (Store.mode === '1') {
            this.#modeList[0].checked = true
        } else if (Store.mode === '2') {
            this.#modeList[1].checked = true
            this.#vs = true
        }
        if (Store.games === '3') {
            this.#gameList[0].checked = true
        } else if (Store.games === '5') {
            this.#gameList[1].checked = true
        }
        if (Store.night === '1') {
            this.#night.click()
        }
        this.#root.style.setProperty('--vs-width', this.#width.value + '%')
    }

    #addEventListener() {

        // 对战模式
        this.#modeList.forEach(item => {
            item.addEventListener('click', () => {
                if (item.value === '1') {
                    this.#vs = false
                    this.#setting = { 'people': '1' }
                } else {
                    this.#vs = true
                    this.#setting = { 'people': this.#people.value }
                }
                item.blur()
                Store.mode = item.value
            })
        })

        // 对战人数
        this.#people.addEventListener('change', () => {
            this.#setting = { 'people': this.#people.value }
            Store.people = this.#people.value
        })

        // 宽度
        this.#width.addEventListener('input', () => {
            this.#root.style.setProperty('--vs-width', this.#width.value + '%')
            Store.width = this.#width.value
            this.#width.blur()
        })

        // 对战场次
        this.#gameList.forEach(item => {
            item.addEventListener('click', () => {
                this.#setting = { 'games': item.value }
                Store.games = item.value
            })
        })

        // 日间/夜间模式
        this.#night.addEventListener('click', () => {
            if (this.#night.checked) {
                this.#root.style.setProperty('--color', '#fff')
                this.#root.style.setProperty('--bg', '#000')
                Store.night = '1'
            } else {
                this.#root.style.setProperty('--color', '#000')
                this.#root.style.setProperty('--bg', '#fff')
                Store.night = '0'
            }
        })
    }
})