<template>
  <div>
    <div style="text-align:center;">
    <div class="weekday">
      <div class="pre-day" @click="changeActiveIndex(-1)" :class="{'inactive': activeIndex<=1}">&lt;</div>
      <div class="day-container"><div class="day-item" v-for="item in 7"
      :key="item" v-show="activeIndex===item">
      {{item | localeWeekDay(firstDay, local)}}</div></div>
      <div @click="changeActiveIndex(1)" :class="{'inactive': activeIndex>=7}" class="next-day">&gt;</div>
    </div>
    <canvas width="200" height="200" ref="myClock"
    @click="clickClock">
    <!-- @mousemove="hoverClock" -->
    </canvas>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Label from './Label.js'
import { CENTERT_TEXTS } from './const.js'
const DELTA = 10
const BIG_CIRCLE_R = 100
const BIG_CIRCLE_X = 100
const BIG_CIRCLE_Y = 100
export default {
  props: {
    courseNum: {
      default () {
        return 8
      }
    },
    selectedTimes: {
      default () {
        return {}
      }
    } // 选中的时间：以星期几为索引
  },
  data () {
    return {
      firstDay: 0,
      local: 'zh-cn',
      activeIndex: 1
    }
  },
  methods: {
    changeActiveIndex (delta) {
      const result = this.activeIndex + delta
      if (result >= 1 && result < 8) {
        this.activeIndex = result
      }
      this.init()
      this.draw()
    },
    init () {
      this.ctx = this.$refs.myClock.getContext('2d')
      this.labels = []
      const activeIndex = this.activeIndex
      for (let i = 1; i <= this.courseNum; i++) {
        const selectedDay = this.selectedTimes[activeIndex]
        const isClassActive = selectedDay && selectedDay.indexOf(i) > -1 // 当前节次是否已已选中

        const angle = i * 2 * Math.PI / this.courseNum
        // const {labelX, labelY} = this.calcLabelPosition(i, angle)
        const {centerX, centerY} = this.calcCenterPoint(angle)
        this.labels.push(new Label(i, centerX, centerY + 5, centerX,
          centerY, i, this.ctx, CENTERT_TEXTS[i - 1], isClassActive))
      }
    },
    hoverClock (event) {
      const x = event.offsetX
      const y = event.offsetY
      let isLabelHovered = false
      for (let i = 0, length = this.labels.length; i < length; i++) {
        let currentStatus = this.labels[i].getHovered()
        this.labels[i].setHovered(false)
        if (this.labels[i].contains(x, y)) {
          isLabelHovered = true
          this.labels[i].setHovered(!currentStatus)
        }
      }
      if (isLabelHovered) {
        this.clear()
        this.draw()
      }
    },
    clickClock (event) {
      const x = event.offsetX
      const y = event.offsetY
      let isLabelClicked = false
      let timeIndex = -1

      for (let i = 0, length = this.labels.length; i < length; i++) {
        let currentStatus = this.labels[i].getClicked()
        this.labels[i].setClicked(false)
        if (this.labels[i].contains(x, y)) {
          isLabelClicked = true
          timeIndex = i
          this.labels[i].setClicked(!currentStatus)
          this.labels[i].switchSelected()
        }
      }
      if (isLabelClicked) {
        this.draw()
        const day = this.activeIndex
        const time = timeIndex
        const clicked = this.labels[time].getSelected()
        this.$emit('setTime', {day, time, clicked})
      }
    },
    draw () {
      this.ctx.fillStyle = '#F5F5F5'
      this.ctx.beginPath()
      this.ctx.arc(BIG_CIRCLE_X, BIG_CIRCLE_Y, BIG_CIRCLE_R, 0, 2 * Math.PI)
      this.ctx.fill()
      this.labels.forEach(element => {
        element.draw()
      })
    },
    clear () {
      this.$refs.myClock.height = 200
    },
    calcCenterPoint (angle) {
      const centerX = (BIG_CIRCLE_R - DELTA * 2) * (1 + Math.sin(angle)) + DELTA * 2
      const centerY = (BIG_CIRCLE_R - DELTA * 2) * (1 - Math.cos(angle)) + DELTA * 2

      return { centerX, centerY }
    }
  },
  mounted () {
    this.init()
    this.draw()
  },
  filters: {
    // 过滤器，将时间转化为本地的星期
    localeWeekDay (weekday, firstDay, locale) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale(locale)
      return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
    }
  }
}
</script>

<style scoped>
.weekday {
  background: #4EDCCD;
  height: 40px;
  border-radius: 8px 8px 0 0;
  line-height: 40px;
  margin-bottom: 16px;
}
.pre-day,
.next-day,
.day-container,
.day-item {
  color: #fff;
  display: inline-block;
}
.day-container{
  clear: both;
}
.pre-day.inactive,
.next-day.inactive {
  color: #ddd;
  cursor: not-allowed;
}
.pre-day,
.next-day
{
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.pre-day {
  float: left;
  margin-left: 30px;
}
.next-day {
  float: right;
  margin-right: 30px;
}
</style>
