<template>
<!-- 选修课所属类别表格 -->
  <div>
    <el-button round @click="addCategory" style="margin-bottom:20px;">添加类型</el-button>
    <el-table :data="categories"
    :header-cell-style="headerStyle"
    class="digital-table"
    :row-style="rowStyle">
      <el-table-column prop="typeName" label="名称"/>
      <el-table-column prop="timeStr" label="上课时间">
        <!-- <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.ocTypeTimes"
          :key="index">{{item.weekNum | getWeekStr}}{{item.sectionNum | getClassStr}}<span v-if="scope.row.ocTypeTimes.length - 1 !== index">,</span></span>
        </template> -->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="el-icon-edit table-button table-edit-button" @click="editCategory(scope.row)"></span>
          <span class="el-icon-delete table-button table-delete-button" @click="dialogVisible=true;id=scope.row.id"></span>
        </template>
      </el-table-column>
    </el-table>
    <div class="optional-base-course">
      <el-dialog :visible.sync="editDialogVisible" :title="dialogTitle">
        <optional-category-box :isNew="isNew" :category="category"
        @getData="getCategory" @hideDialog="editDialogVisible=false"/>
      </el-dialog>
    </div>
    <el-dialog class="delete-dialog" title="删除类别" :visible.sync="dialogVisible">
      <div class="delete-dialog" style="text-align:center;">
        <div>确定删除该类别？</div>
        <div class="dialog-footer">
          <el-button type="primary" @click="deleteCategory">确定</el-button>
          <el-button @click="dialogVisible=false" class="dialog-cancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseService from '../service/baseService.js'
import {CENTERT_TEXTS, localeWeekDay} from './clock/const.js'
import {deleteCallback} from '../common/CommonCallback.js'
import optionalCategoryBox from '../components/optional/optionalCategoryBox'
export default {
  components: {
    optionalCategoryBox
  },
  data () {
    return {
      categories: [],
      headerStyle: {
        'text-align': 'center',
        'border-top': '1px solid #ddd'
      },
      dialogVisible: false,
      editDialogVisible: false,
      id: -1,
      selectedTime: {},
      category: {},
      dialogTitle: '',
      isNew: false
    }
  },
  methods: {
    addCategory () {
      this.dialogTitle = '添加课程类别'
      this.editDialogVisible = true
      this.category = {}
      this.isNew = true
    },
    editCategory (item) {
      this.dialogTitle = '编辑课程类别'
      this.category = item
      this.isNew = false
      this.editDialogVisible = true
    },
    deleteCategory () {
      const id = this.id

      this.dialogVisible = false
      baseService.deleteCategory(id).then(() => {
        deleteCallback.success.call(this)
        this.categories = this.categories.filter(element => {
          return element.id !== id
        })
      })
        .catch(deleteCallback.fail.bind(this))
    },
    getWeekStr (index) {
      return localeWeekDay(index, 0)
    },
    getClassStr (index) {
      // 获取的是index是多少节次便是多少
      return CENTERT_TEXTS[index - 1]
    },
    getCategory () {
      /**
       * 将以1,2,3显示的星期几和节次转化为字符串
       */
      const transformFunc = (time) => {
        return this.getWeekStr(time.weekNum) + this.getClassStr(time.sectionNum)
      }
      baseService.getCategory()
        .then(({data}) => {
          this.categories = data.map(element => {
            if (element.ocTypeTimes) {
              element.timeStr = element.ocTypeTimes.map(time => {
                return transformFunc(time)
              }).join(',')
            }

            return element
          })
        })
    },
    rowStyle ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return {
          'background': '#EEFAFA'
        }
      }
    }
  },
  mounted () {
    this.getCategory()
  }
  // watch: {
  //   termId (newVal, oldVal) {
  //     this.getCategory()
  //   }
  // }
}
</script>

<style lang="postcss">
.table-button {
  display: inline-block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;

}
.table-edit-button {
  border:1px solid #FEA96D;
  color: #FEA96D;
}
.table-delete-button {
  border:1px solid #66E1D3;
  color: #66E1D3;
}
.digital-table,
.el-table th{
  text-align: center;
}
.el-table--enable-row-hover .el-table__body tr:hover>td .table-edit-button {
  background: #FEA96D;
  color: #fff;
}
.el-table--enable-row-hover .el-table__body tr:hover>td .table-delete-button {
  background: #66E1D3;
  color: #fff;
}
.dialog-footer {
  margin-top: 40px;
}
.dialog-footer .el-button--primary {
  background: #3DD9C4;
  border-color: #3DD9C4;
  box-shadow: 4px 4px 2px #e7e7e7;
  width: 100px;
  border-radius: 20px;
}
.dialog-footer .dialog-cancel {
  width: 100px;
  border-radius: 20px;
}
.el-dialog__header {
  border-bottom: 1px solid #F3F3F3;
}
.el-dialog__body {
  padding-top: 40px;
}
.delete-dialog .el-dialog {
  width: 500px;
}
</style>
