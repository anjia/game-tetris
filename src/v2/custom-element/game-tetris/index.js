import GameContext from '../game-context/index.js'

import Base from '../js/CustomBase.js'

customElements.define('game-tetris', class extends Base {

    // 私有变量
    #people;
    #context;    // <game-context>[]
    #status = 0;
    #overCounter = 0
    #btnStart;
    #btnAgain;

    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.isConnected) return

        // 获取 HTML 属性
        this.#people = parseInt(this.getAttribute('people')) || 1
        const games = parseInt(this.getAttribute('games')) || 3

        // 构造 DOM
        this.#context = []
        for (let i = 0; i < this.#people; i++) {
            this.#context.push(Base.create('game-context', { 'people': this.#people, 'games': games }))
        }
        this.#btnStart = Base.createByOptions('button', { 'class': 'start' })
        this.#btnAgain = Base.createByOptions('button', { 'text': '再来一局' })

        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(Base.createLink('./custom-element/game-tetris/index.css'))

        let op = Base.createByOptions('div', {}, [this.#btnStart, this.#btnAgain])
        if (this.#people === 1) {
            shadow.appendChild(this.#context[0])
            shadow.appendChild(op)
        } else {
            shadow.appendChild(this.#context[0])
            for (let i = 1; i < this.#people; i++) {
                let text = Base.createByOptions('div', { 'text': 'VS' })
                let children = [text]
                if (i === 1) {
                    children.push(op)
                }
                shadow.appendChild(Base.createByOptions('div', { 'class': 'vs' }, children))
                shadow.appendChild(this.#context[i])
            }
        }

        // 监听事件
        this.#addEventListener()
    }

    #addEventListener() {
        this.#btnStart.addEventListener('click', () => {
            // 0 未开始-准备中，1-游戏中，2-暂停，3-继续，4-gameover
            switch (this.#status) {
                case 0:  // 未开始 -> 游戏中
                    this.#start()
                    this.#btnStart.className = 'start pause'  // 游戏中时，可暂停
                    this.#status = 1
                    break
                case 1:  // 游戏中 -> 暂停
                case 3:  // 继续后 -> 暂停
                    this.#pause()
                    this.#btnStart.className = 'start continue'  // 暂停时，可继续
                    this.#status = 2
                    break
                case 2:  // 暂停 -> 继续
                    this.#continue()
                    this.#btnStart.className = 'start pause'  // 继续后，可暂停
                    this.#status = 3
                    break
                case 4:  // gameover
                    break
            }
        })

        this.#btnAgain.addEventListener('click', () => {
            this.#reset()
            GameContext.reset()  // 重置全局类
            for (let c of this.#context) {
                c.resetPanel()   // 重置游戏面板相关，比如 <grid-panel>, <next-shape>
                c.reset()        // 重置其它元素，比如 <clear-lines>, <win-counter>
            }
        })

        this.addEventListener('gameover', () => {
            this.#overCounter++
            if (this.#overCounter === this.#people) {
                this.#reset()
                // 比分数：谁多谁赢
                // this.#context[i].win()
            }
        })
    }

    #start() {
        for (let c of this.#context) {
            c.start()
        }
    }

    #pause() {
        for (let c of this.#context) {
            c.pause()
        }
    }

    #continue() {
        for (let c of this.#context) {
            c.continue()
        }
    }

    #reset() {
        this.#status = 0;
        this.#overCounter = 0
        this.#btnStart.className = 'start'
    }
})