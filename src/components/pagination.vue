<template>
  <div class="digital-pagination">
    共<span class="page-total-number">{{totalNumber}}</span>条数据 每页显示：
    <el-select v-model="pageSize" @change="pageSizeChange" class="page-select">
      <el-option v-for="(item, index) in pageSizes"
      :key="index" :label="item" :value="item"/>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    totalNumber: {
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      pageSize: 10,
      pageSizes: [10, 20, 50]
    }
  },
  methods: {
    pageSizeChange (pageSize) {
      this.$emit('pageSizeChange', pageSize)
    }
  }
}
</script>

<style scoped>
.digital-pagination {
 display: inline-block;
 float: right;
}
.page-total-number {
  color: #FEAA74;
  font-weight: 900;
}
.page-select{
  width: 80px;
}
</style>
