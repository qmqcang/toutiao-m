<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
        :to="{
          name: 'article',
          params: {
            articleId: article.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 10 // 每页返回条目
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: { data } } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText // 关键字
        })

        const { results } = data
        this.list.push(...results)

        // 关闭加载中
        this.loading = false

        if (results.length) {
          this.page++
        } else {
          // 关闭加载更多
          this.finished = false
        }
      } catch (error) {
        this.$toast('没有相关内容')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
