<template>
  <!-- 类别弹框 -->
  <div style="text-align:center;margin-top:40px;">
    <div class="category-container">
      <span>
        <span class="red-star">*</span>
          课程类别
      </span>
      <el-input class="category-input" v-model="category.typeName"/>
    </div>
    <div v-show="isNameInvalid" style="color:red;">
      请输入课程类别
    </div>
    <div class="category-container">
      <span>
        <span class="red-star">*</span>
          上课时间
      </span>
       <el-input class="category-input" @focus="showTime=true" v-model="category.timeStr"/>
       <div v-show="isTimeInvalid" style="color:red;">
          请选择上课时间
        </div>
       <div class="select-time" v-show="showTime">
         <clock @setTime="setTime" :selectedTimes="selectedTimes"/>
         <div class="button-container">
           <el-button type="text" class="OK" @click="OK">确定</el-button>
           <el-button type="text" class="Cancel" @click="Cancel">取消</el-button>
         </div>
       </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" round class="OK-button" @click="categoryOK">确定</el-button>
      <el-button round class="Cancel-button" @click="categoryCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import clock from '../clock/clock'
import moment from 'moment'
import { CENTERT_TEXTS } from '../clock/const.js'
import baseService from '../../service/baseService.js'
export default {
  components: {
    clock
  },
  props: ['category'],
  data () {
    return {
      showTime: false,
      times: [],
      isNameInvalid: false,
      isTimeInvalid: false,
      selectedTimes: {}
    }
  },
  methods: {
    OK () {
      this.showTime = false
    },
    Cancel () {
      this.showTime = false
    },
    localeWeekDay (weekday, firstDay) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale('zh-cn')
      return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
    },
    checkValidate () {
      if (this.category.name === '') {
        this.isNameInvalid = true
      } else {
        this.isNameInvalid = false
      }

      if (this.category.time === '') {
        this.isTimeInvalid = true
      } else {
        this.isTimeInvalid = false
      }
      return !this.isNameInvalid && !this.isTimeInvalid
    },
    categoryOK () {
      const validate = this.checkValidate()
      if (validate) {
        const category = this.category
        baseService.updateCategory(category)
        this.$emit('hideDialog')
      }
    },
    categoryCancel () {
      this.$emit('hideDialog')
    },
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
        timeStr += this.localeWeekDay(element.day, 0) + CENTERT_TEXTS[element.time] + ' '
      })
      this.category.timeStr = timeStr
    }
  },
  mounted () {
    this.category.ocTypeTimes.forEach(element => {
      let day = this.selectedTimes[element.weekNum]
      if (!day) {
        day = this.selectedTimes[element.weekNum] = []
      }
      day.push(element.sectionNum + 1)
    })
  }
}
</script>

<style>
.select-time {
  box-shadow: 2px 4px 4px #E7E7E7;
  width: 280px;
}
.OK span {
  color: #1FC4B1;
}
.Cancel span{
  color: #CECECE;
}
.button-container {
  text-align:right;
  margin-right:20px;
}
.dialog-footer {
  text-align: center;
  margin-top: 40px;
}
.OK-button {
  background: #1FC4B1;
  width: 100px;
  border: none;
  margin-right: 20px;
  box-shadow: 2px 4px 4px #E7E7E7;
}
.Cancel-button {
  background: #fff;
  width: 100px;
  border: 1px solid #CECECE;
}
.Cancel-button span{
  color: #CECECE;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #7EEADD;
    border-color: #7EEADD;
    color: #fff;
}
.category-input {
  width: 280px;
  margin-left: 20px;
}
.category-input input {
  border-radius: 20px;
}
.category-container {
  margin-bottom:20px;
}
.select-time {
  position: absolute;
  z-index: 2;
  background: #fff;
  left: calc(50% - 100px);
  margin: auto;
  margin-top: 2px;
}
</style>
