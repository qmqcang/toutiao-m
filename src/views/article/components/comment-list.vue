<template>
  <div class="comment-list">
    <van-cell>
      <template #title>
        <div class="title_left">
          <span class="comment">评论</span>
          <span class="comment_count">{{ totalCommentCount }}</span>
        </div>
        <div class="title_right">
          <span class="like_count">888 赞</span>
          <span class="line">|</span>
          <span class="share">0 转发</span>
        </div>
      </template>
    </van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    },
    totalCommentCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      const { data: { data } } = await getComments({
        type: this.type, // a-对文章的评论 c-对评论的回复
        source: this.source.toString(), // 源id
        offset: this.offset, // 页码
        limit: this.limit // 每次请求条数
      })
      // 所有评论数量
      this.$emit('update:totalCommentCount', data.total_count)

      const { results } = data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.offset = data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-list {
  .van-cell__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title_left {
      font-size: 34px;
      color: #000;
      font-weight: bold;

      .comment {
        margin-right: 10px;
      }
    }

    .title_right {
      color: #999;

      .line {
        font-weight: 100;
        padding: 0 15px;
        color: #e0e0e0;
      }
    }
  }

}
</style>
