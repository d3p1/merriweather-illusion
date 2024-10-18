/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class App {
  /**
   * @type {number}
   */
  cellSize

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  context

  /**
   * Constructor
   */
  constructor(cellSize) {
    this.cellSize = cellSize

    this.#initCanvas()
    this.#initIllusion()

    this.#addResizeListener()
  }

  /**
   * Init illusion
   *
   * @returns {void}
   */
  #initIllusion() {
    for (
      let x = this.cellSize * 0.5;
      x < this.canvas.width;
      x += this.cellSize
    ) {
      for (
        let y = this.cellSize * 0.5;
        y < this.canvas.height;
        y += this.cellSize
      ) {
        this.#drawEllipse(x, y, (x + y) * 3)
      }
    }
  }

  /**
   * Draw ellipse
   *
   * @returns {void}
   */
  #drawEllipse(x, y, rotation = 0) {
    const smallRadius = this.cellSize * 0.2
    const bigRadius = this.cellSize * 0.5
    this.context.beginPath()
    this.context.fillStyle = 'hsl(120,100%,50%)'
    this.context.ellipse(x, y, bigRadius, smallRadius, rotation, 0, 2 * Math.PI)
    this.context.fill()
  }

  /**
   * Add resize listener
   *
   * @returns {void}
   */
  #addResizeListener() {
    window.addEventListener('resize', () => {
      this.#resizeCanvas()
      this.#initIllusion()
    })
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.#resizeCanvas()

    document.body.appendChild(this.canvas)
  }

  /**
   * Resize canvas
   *
   * @returns {void}
   */
  #resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}
