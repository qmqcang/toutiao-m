<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"></search-result>
    <!-- 联想功能 -->
    <search-suggestion
     v-else-if="searchText"
     :search-text="searchText"
     ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import SearchResult from '@/views/search/components/search-result'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  methods: {
    // 回车时触发
    onSearch () {
      this.isResultShow = true
    },

    onCancel () {
      this.$router.back()
    },

    onFocus () {
      console.log('获得焦点')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
