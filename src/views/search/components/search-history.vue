<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div v-if="isDeleteShow">
        <span @click="$emit('update:search-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        @click="isDeleteShow = true"
        name="delete"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onDelete(history, index)"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
      />
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDelete (history, index) {
      // 删除搜索记录
      if (this.isDeleteShow) {
        // prop 数据是引用类型(数组，对象)时可以修改的 但任何prop数据都不可以重新赋值 这时可以用$emit来触发父组件的方法
        return this.searchHistories.splice(index, 1)
      }

      // 执行搜索跳转
      this.$emit('search', history)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
