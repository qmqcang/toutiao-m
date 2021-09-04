<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        ref="getFocus"
        v-model.trim="searchText"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想功能 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
     ></search-suggestion>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories.sync="searchHistories"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import SearchResult from '@/views/search/components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('SEARCH-HISTORIES') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    // 回车时触发
    onSearch (searchText) {
      if (searchText) {
        this.isResultShow = true

        this.searchText = searchText

        // 历史记录
        const index = this.searchHistories.indexOf(searchText)
        // 历史记录中存在时
        if (index !== -1) {
          this.searchHistories.splice(index, 1)
        }
        this.searchHistories.unshift(searchText)
      }
    },

    async loadSearchHistories () {
      let searchHistories = getItem('SEARCH-HISTORIES') || []
      // 判断登录状态 获取线上的历史记录
      if (this.user) {
        const { data: { data } } = await getSearchHistories()

        // 合并去重线上和线下的历史记录
        searchHistories = [...new Set([...searchHistories, ...data.keywords])]
      }

      this.searchHistories = searchHistories
    }
  },
  watch: {
    searchHistories () {
      setItem('SEARCH-HISTORIES', this.searchHistories)
    }
  }
  // ,
  // mounted () {
  //   this.$nextTick(function () {
  //     this.$refs.getFocus.focus()
  //   }, 100)
  // }
  // directives: {
  //   myfocus: {
  //     inserted (el, binding) {
  //       el.focus()
  //     }
  //   }
  // }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .search-history, .search-result, .search-suggestion {
    position: absolute;
    top: 108px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }

  .van-search__action {
    color: #fff;
  }
}
</style>
