<template>
  <!-- 类别弹框 -->
  <div style="text-align:center;margin-top:40px;">
    <div class="category-container">
      <span>
        <span class="red-star">*</span>
          所属领域
      </span>
      <el-input class="category-input" placeholder="请输入所属领域" v-model="domain.domainName"/>
    </div>
    <div v-show="isNameInvalid" style="color:red;">
      请输入课程类别
    </div>
    <div class="dialog-footer">
      <el-button type="primary" round class="OK-button" @click="domainOK">确定</el-button>
      <el-button round class="Cancel-button" @click="$emit('hideDialog')">取消</el-button>
    </div>
  </div>
</template>

<script>
import clock from '../clock/clock'
import baseService from '../../service/baseService.js'
import {updateCallback} from '../../common/CommonCallback.js'
export default {
  components: {
    clock
  },
  props: ['domain', 'isAdd'],
  data () {
    return {
      isNameInvalid: false
    }
  },
  methods: {
    checkValidate () {
      if (this.domain.name === '') {
        this.isNameInvalid = true
      } else {
        this.isNameInvalid = false
      }
      return !this.isNameInvalid
    },
    domainOK () {
      const validate = this.checkValidate()
      if (validate) {
        const domain = this.domain
        // 添加领域
        if (this.isAdd) {
          baseService.addDomain(domain)
            .then(({data}) => {
              console.log(data)
              if (data.code === 1) {
                console.log(data)
                updateCallback.fail.call(this, `添加失败，原因：${data.msg}`)
              } else {
                updateCallback.success.call(this, '添加成功')
              }
              this.$emit('getData')
            })
            .catch(err => {
              console.error(err)
              updateCallback.fail.call(this, '添加失败')
              this.$emit('getData')
            })
        } else {
          baseService.updateDomain(domain)
            .then(({data}) => {
              if (data.code === 1) {
                updateCallback.fail.call(this, `更新失败，原因：${data.msg}`)
              } else {
                updateCallback.success.call(this, '更新成功')
              }
              this.$emit('getData')
            })
            .catch(err => {
              console.error(err)
              updateCallback.fail.call(this, '更新失败')
              this.$emit('getData')
            })
        }
        this.$emit('hideDialog')
      }
    }
  }
}
</script>

<style>
.red-star {
  color: red;
  vertical-align:sub;
}
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
  border-radius: 20px;
}
.Cancel-button {
  background: #fff;
  width: 100px;
  border: 1px solid #CECECE;
  border-radius: 20px;
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
