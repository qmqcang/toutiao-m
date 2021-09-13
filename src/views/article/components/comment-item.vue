<template>
  <van-cell
    class="comment-item"
    :border="false"
  >
    <!-- 头像 -->
    <template #icon>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
    </template>
    <!-- 评论信息 -->
    <template #title>
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <!-- 点赞 -->
        <div class="like-wrap">
          <span
            class="like-count"
            :class="{
              liked: comment.is_liking
            }"
          >{{ comment.like_count }}</span>
          <van-icon
            class="like-icon"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :class="{
              liked: comment.is_liking
            }"
            @click="onCommentLike"
          />
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="pubdate-wrap">
        <span class="pubdate">{{ comment.pubdate | datetime('MM-DD HH:mm')}}</span>
        <van-button
          class="reply-btn"
          round
          size="mini"
          @click="$store.commit('setReplyShow', [true, comment])"
        >{{ comment.reply_count }}回复</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { addCommentsLike, deleteCommentsLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentsLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentsLike(commentId)
        this.comment.like_count++
      }

      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 26px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;

    .name {
      font-size: 28px;
      color: #406599;
    }

    .like-wrap {
      display: flex;
      align-items: center;

      .like-count {
        font-size: 30px;
        color: #000;
        margin-right: 6px;
      }

      .like-icon {
        font-size: 38px;
      }

      .liked {
        color: tomato;
      }
    }

  }

  .content {
    font-size: 32px;
    color: #222;
  }

  .pubdate-wrap {
    display: flex;
    align-items: center;

    .pubdate {
      font-size: 12px;
      margin-right: 16px;
      color: #999;
    }

    .reply-btn {
      padding: 0 12px;
      height: 40px;
      background-color: #f8f8f8;
      border: 0;
    }
  }
}
</style>
