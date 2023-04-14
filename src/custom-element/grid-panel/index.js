import { createLink } from '../js/utility.js'



customElements.define('grid-panel', class extends HTMLElement {
    constructor() {
        super()

        // 实例属性
        this.container = null
        this.rows = 20
        this.columns = 10
        this.shape = null    // 当前形状

        // 数据
        this.data = null
        this.maxRow;    // 楼盖的最高行数
        this.timer;     // 降落的计时器
        this.status;    // 状态
        this.current;   // 当前形状

        this.data = new Array(this.rows)
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = new Array(this.columns)
        }

        // const col2 = parseInt(this.columns / 2)
        // const col1 = col2 - 1


        // shadow DOM
        let shadow = this.attachShadow({ mode: 'open' })

        // style
        shadow.appendChild(createLink('./custom-element/grid-panel/index.css'))

        // html
        this.container = document.createElement('section')
        this.container.setAttribute('class', 'grid')
        let innerHTML = ''
        for (let i = 0; i < this.rows * this.columns; i++) {
            innerHTML += '<span></span>'
        }
        this.container.innerHTML = innerHTML
        shadow.appendChild(this.container)
    }
    reset() {
        // this.panel.reset()
        // this.maxRow = this.rows - 1
        // this.clearRows = 0
        // this.#clearScreen()
    }

    start() {
        // if (this.isplaying) {
        //     this.status = 2
        //     this.#clearTimer()
        // } else {
        //     if (this.ispreparing) {
        //         this.#startNext()
        //     } else if (this.ispausing) {
        //         this.#falling()
        //     }
        //     this.status = 1
        // }
        // console.log('grid-panel, this.shape=', this.shape)
    }
    pause() {

    }
    left() {

    }
    right() {

    }
    down() {

    }
    rotate() {

    }

    // horizontal(dir) {
    //     if (!this.ispreparing) {
    //         const { msg, next } = this.model.getHorizontalPos(this.current, dir)
    //         if (msg === 'success') {
    //             this.#renderNext(next)
    //         }
    //         if (this.ispausing) {
    //             this.start()
    //         }
    //     }
    // }
    // down() {
    //     if (!this.ispreparing) {
    //         const { msg, next } = this.model.getDownPos(this.current)
    //         if (msg === 'success') {
    //             this.#renderNext(next)
    //         }
    //         if (this.ispausing) {
    //             this.start()
    //         }
    //     }
    // }
    // rotate() {
    //     if (!this.ispreparing) {
    //         const { msg, next } = this.model.getRotatePos(this.current)
    //         if (msg === 'success') {
    //             this.#renderNext(next)
    //         }
    //         if (this.ispausing) {
    //             this.start()
    //         }
    //     }
    // }

    // get ispreparing() {
    //     return this.status === 0
    // }
    // get isplaying() {
    //     return this.status === 1
    // }
    // get ispausing() {
    //     return this.status === 2
    // }
    // #toggleClass(obj, name) {
    //     let flag = false
    //     let newList = []
    //     for (let item of obj.classList) {
    //         if (item === name) {
    //             flag = true
    //         } else {
    //             newList.push(item)
    //         }
    //     }
    //     if (flag === false) {
    //         newList.push(name)
    //     }
    //     obj.className = newList.join(' ')
    // }

    // reset() {
    //     for (let i = 0; i < this.rows; i++) {
    //         for (let j = 0; j < this.columns; j++) {
    //             this.data[i][j] = 0
    //         }
    //     }
    // }
    // updateGrid(data, max = 0) {
    //     for (let i = max; i < this.rows; i++) {
    //         const start = i * this.columns
    //         for (let j = 0; j < this.columns; j++) {
    //             this.updateCell(start + j, data[i][j])
    //         }
    //     }
    // }
    // updateCell(i, mode) {
    //     const flag = ['', 'light', 'blink']
    //     this.domGrid.children[i].className = flag[mode]
    // }

    // subtract(arr1, arr2) {
    //     return subtract(arr1, arr2)
    // }
    // subtract(arr1, arr2) {
    //     // arr1 - arr2
    //     let result = []
    //     for (let p1 of arr1) {
    //         let exist = false
    //         for (let p2 of arr2) {
    //             if (p1[0] === p2[0] && p1[1] === p2[1]) {
    //                 exist = true
    //                 break
    //             }
    //         }
    //         if (!exist) result.push(p1)
    //     }
    //     return result
    // }
    // canStart(points) {
    //     let result = true
    //     for (let p of points) {
    //         if (p[0] === 0 && this.data[p[0]][p[1]] === 1) {
    //             result = false
    //             this.reset()
    //             break
    //         }
    //     }
    //     return result
    // }
    // canFall(points) {
    //     let result = {
    //         msg: '',
    //         next: null,
    //         maxRow: this.maxRow,
    //         fullRows: [],
    //         data: null
    //     }

    //     let next = []
    //     for (let p of points) {
    //         let nextI = p[0] + 1
    //         let nextJ = p[1]

    //         // 降落到底了
    //         if (nextI === this.rows) {
    //             break
    //         } else if (this.#isCellFilled(nextI, nextJ)) {
    //             // 被卡住了，不能再落了
    //             break
    //         }
    //         next.push([nextI, nextJ])
    //     }

    //     // 下落正常，返回
    //     if (next.length === 4) {
    //         result.msg = 'continue'
    //         result.next = next
    //     } else {
    //         // 不能再落了，则定位在此处
    //         result.msg = 'done'
    //         let updateRows = new Set()
    //         for (let p of points) {
    //             if (p[0] >= 0) {
    //                 this.data[p[0]][p[1]] = 1
    //                 updateRows.add(p[0])
    //                 if (p[0] < this.maxRow) {
    //                     this.maxRow = p[0]
    //                 }
    //             } else {
    //                 // 形状没有画全
    //                 result.msg = 'gameover'
    //                 this.reset()
    //                 break
    //             }
    //         }
    //         result.maxRow = this.maxRow

    //         // 判断是否有满行的
    //         if (result.msg === 'done') {
    //             for (let row of updateRows) {
    //                 let j = 0
    //                 while (j < this.columns && this.#isCellFilled(row, j)) j++
    //                 if (j === this.columns) {
    //                     result.fullRows.push(row)
    //                 }
    //             }
    //             if (result.fullRows.length) {
    //                 this.clearRows += result.fullRows.length
    //                 this.#clearFullRows(result.fullRows)
    //             }
    //             result.data = this.data
    //         }
    //     }

    //     return result
    // }


    // /**
    //  * private methods
    //  */
    // #isCellFilled(i, j) {
    //     return i >= 0 && i < this.rows && j >= 0 && j < this.columns && this.data[i][j] === 1
    // }
    // #clearFullRows(fullRows) {
    //     // 原地排序，从小-大
    //     fullRows.sort((a, b) => {
    //         if (a > b) return 1
    //         else if (a < b) return -1
    //         return 0
    //     })
    //     // 从小到大，依次消除
    //     for (let row of fullRows) {
    //         for (let i = row; i >= this.maxRow; i--) {
    //             const srcI = i - 1
    //             for (let j = 0; j < this.columns; j++) {
    //                 this.data[i][j] = ((srcI >= 0 && srcI >= this.maxRow) ? this.data[srcI][j] : 0)
    //             }
    //         }
    //         this.maxRow++

    //         // console.log('消行', row)
    //         // console.log(this.data)
    //         // console.log('盖楼最高层（现在）', this.maxRow)
    //     }
    // }


    // // 
    // #draw() {

    // }

})