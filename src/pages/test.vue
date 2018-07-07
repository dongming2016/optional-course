<template>
  <div>
    <alphabet :indexer="indexers" v-on:clickAlphabet="showName"/>
    <div>
      <el-button v-for="(item, index) in showNames" class="button"
      :key="index" type="primary" plain>{{item.name}}</el-button>
    </div>
    <clock/>
  </div>
</template>

<script>
import alphabet from '../components/base/alphabet'
import characterUtil from '@/util/characterUtil.js'
import clock from '@/components/clock/clock'
export default {
  components: {
    alphabet,
    clock
  },
  data () {
    return {
      allTeachers: [
        {id: 1, name: '安天'},
        {id: 2, name: '中华'},
        {id: 3, name: '安名'},
        {id: 3, name: '明天'}
      ],
      indexedTeachers: [],
      indexers: [],
      showNames: []
    }
  },
  methods: {
    showName (indexer) {
      this.showNames = this.indexedTeachers[indexer]
    }
  },
  created () {
    this.indexedTeachers = characterUtil.indexNames(this.allTeachers)
    this.indexers = Object.keys(this.indexedTeachers).sort()
  },
  computed: {
    /**
     * 对老师进行分类
     */
    indexTeachers () {
      return characterUtil.indexNames(this.allTeachers)
    }
  }
}
</script>

<style scoped>
.button {
  border-color: #ddd;
  color: #ddd;
  background: #fff;
  border-radius: 20px;
}
.button .active {
  border-color: aqua;
  color: aqua;
}
</style>
