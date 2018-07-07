<template>
  <div>
    <el-input class="round-input" placeholder="请输入上课时间"
    @focus="showTime=true" v-model="timeStr"/>
      <div class="select-time" style="width:230px;" v-show="showTime">
        <clock @setTime="setTime"/>
        <div class="button-container" style="margin-right:15px;">
          <el-button type="text" class="OK" @click="OK">确定</el-button>
          <el-button type="text" class="Cancel" @click="Cancel">取消</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import clock from '../clock/clock'
import { CENTERT_TEXTS, localeWeekDay } from '../clock/const.js'
export default {
  components: {
    clock
  },
  props: {
    timeSelected: {
      default () {
        return {
          timeStr: ''
        }
      }
    }
  },
  data () {
    return {
      showTime: false,
      times: [],
      timeStr: ''
    }
  },
  methods: {
    setTime ({day, time, clicked}) {
      if (clicked) {
        this.times.push({day, time})
      } else {
        this.times = this.times.filter(element => {
          return element.day !== day || element.time !== time
        })
      }

      let timeStr = ''
      this.times.forEach(element => {
        timeStr += localeWeekDay(element.day, 0) + CENTERT_TEXTS[element.time] + ' '
      })
      this.timeStr = timeStr
    },
    OK () {
      this.showTime = false
      this.$emit('selectTime', this.timeStr)
    },
    Cancel () {
      this.showTime = false
    }
  }
}
</script>

<style>
.select-time {
  position: absolute;
  z-index: 2;
  background: #fff;
}
</style>
