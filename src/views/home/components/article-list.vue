<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据的时间戳
      error: false, // 数据加载失败提示
      isFreshLoading: false, // 控制下拉刷新
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      }).then((result) => {
        const { data: { data } } = result
        this.list.push(...data.results)

        this.loading = false

        // 数据加载完成时
        if (data.results.length) {
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      }).catch((err) => {
        console.log(err)

        this.error = true
        this.loading = false
      })
    },
    async onRefresh () {
      await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      }).then((result) => {
        const { data: { data } } = result
        // 获取的最新数据追加到列表顶部
        this.list.unshift(...data.results)

        this.isFreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${data.results.length}条数据`
      }).catch((err) => {
        console.log(err)

        this.isFreshLoading = false
        this.refreshSuccessText = '刷新失败，请重新再试一次'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>>
