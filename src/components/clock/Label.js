const r = 12
const COLOR_BACKGROUND = '#4DD0BF'
// const HOVERED_COLOR = 'rgba(77, 208, 191, 0.75)' // 透明度
const ACTIVE_COLOR = '#fff'
export default class Label {
  /**
   *
   * @param {Label的左侧坐标} x
   * @param {label的右侧坐标} y
   * @param {label的中心x坐标} centerX
   * @param {label的中心y坐标} centerY
   * @param {label的文字} text
   * @param {label的是否被选中} selected
   * @param {canvas} ctx
   */
  constructor (id, labelX, labelY, centerX, centerY,
    text, ctx, centerText, selected, R = r) {
    this.id = id
    this.labelX = labelX
    this.labelY = labelY
    this.centerX = centerX
    this.centerY = centerY
    this.text = text
    this.ctx = ctx
    this.centerText = centerText
    this.selected = selected
    this.r = R
    this.clicked = false
    this.hovered = false
  }

  draw () {
    if (this.hovered) {
      this.ctx.fillStyle = COLOR_BACKGROUND
      this.drawCircle()
      this.ctx.fillStyle = ACTIVE_COLOR
    }
    if (this.selected) {
      this.ctx.fillStyle = COLOR_BACKGROUND
      this.drawCircle()
      this.ctx.fillStyle = ACTIVE_COLOR
    }
    this.ctx.fillStyle = 'red'
    this.ctx.textAlign = 'center'
    this.ctx.font = '16px Georgia'
    this.ctx.fillText(this.text, this.labelX, this.labelY)
    this.drawCenterText()
  }

  getSelected () {
    return this.selected
  }
  getClicked () {
    return this.clicked
  }
  setClicked (clicked) {
    this.clicked = clicked
  }
  drawCenterText () {
    if (this.hovered || this.clicked) {
      this.ctx.fillStyle = 'red'
      this.ctx.textAlign = 'center'
      this.ctx.font = '20px Georgia bold'
      this.ctx.fillText(this.centerText, 100, 110)
    }
  }

  drawCircle () {
    this.ctx.beginPath()
    this.ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI)
    this.ctx.fill()
  }
  switchSelected () {
    this.selected = !this.selected
  }
  isSelected () {
    return this.selected
  }
  setHovered (hovered) {
    this.hovered = hovered
  }
  getHovered () {
    return this.hovered
  }
  /**
   * 鼠标是否包含在该label中
   * @param {鼠标的x坐标} mouseX
   * @param {鼠标的y坐标} mouseY
   */
  contains (mouseX, mouseY) {
    /**
     * 计算平方
     * @param {数字} num
     */
    const square = num => {
      return Math.pow(num, 2)
    }
    /**
     * 计算两点距离的平方
     * @param {起点} param0
     * @param {终点} param1
     */
    const pointDistanceSquare = (startX, startY, endX, endY) => {
      return square(startX - endX) + square(startY - endY)
    }
    const centerX = this.centerX
    const centerY = this.centerY
    return pointDistanceSquare(centerX, centerY,
      mouseX, mouseY) <= square(r)
  }
}
