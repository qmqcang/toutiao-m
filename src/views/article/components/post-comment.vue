<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      size="mini"
      class="post-btn"
      :disabled="!message"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      if (!this.message) return

      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const { data: { data } } = await addComment({
        target: this.target.toString(), // 评论的目标id
        content: this.message, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null // 评论的文章id 对文章进行评论不需要传 评论用户评论则需要
      })

      this.$emit('post-success', data.new_obj)

      this.$toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  align-items: center;
  padding: 28px;

  ::v-deep.van-field {
    background-color: #fafafa;
  }

  .post-btn {
    align-self: flex-end;
    width: 100px;
    height: 100px;
    border: 0;
    font-size: 30px;
    font-weight: 700;
    color: #ddd;
  }
}
</style>
