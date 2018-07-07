<template>
  <div>
    <div v-for="(item, index) in indexer" class="item"
    :class="{'active':activeIndex===index}" @click="activeIndex=index;$emit('clickAlphabet', item);" :key="index">{{item}}</div>
  </div>
</template>

<script>
const ALPHABET = []
for (let i = 65; i < 91; i++) {
  // 通过unicode获取字母
  ALPHABET.push(String.fromCharCode(i))
}
export default {
  props: {
    indexer: Array
  },
  data () {
    return {
      activeIndex: -1
    }
  },
  methods: {
  },
  computed: {
    getIndex () {
      return {
        ALPHABET
      }
    }
  }
}
</script>

<style scoped>
.item {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color:#43C8B9;
  cursor: pointer;
  display: inline-block;
}
.item.active {
  color: #fff;
  background: #43C8B9;
  border-radius: 50%;
}
</style>
