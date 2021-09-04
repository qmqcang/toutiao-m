<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', str)"
    >
      <template #title>
        <div v-html="highlight(str)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash' // 搜索防抖

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 关键字联想列表
    }
  },
  methods: {
    // 指定字符串高亮
    highlight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data: { data } } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.options
      }, 200),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
