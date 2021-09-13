<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <template #left>
        <van-icon
          name="cross"
          @click="$store.commit('setReplyShow', [false])"
        ></van-icon>
      </template>
    </van-nav-bar>
    <!-- 当前评论 -->
    <comment-item :comment="comment" />
    <!-- 评论中的回复 -->
    <comment-list
      :source="comment.com_id"
      type="c"
      :list="commentList"
    />
    <!-- 底部写评论 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
    </div>
    <!-- 弹出层评论 -->
    <van-popup
      class="popup"
      v-model="isPostShow"
      position="bottom"
    >
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSucces"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'

export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  methods: {
    onPostSucces (comment) {
      this.commentList.unshift(comment)
      this.comment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
    .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 380px;
      height: 60px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
  }
}
</style>
