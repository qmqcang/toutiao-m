<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      border
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="article-main">
      <h1 class="title">{{ article.title }}</h1>
      <!-- 作者信息 -->
      <van-cell class="user-info" center :border="false">
        <!-- 头像 -->
        <template #icon>
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
        </template>
        <!-- 作者 -->
        <template #title>
          <span class="name">{{ article.aut_name }}</span>
        </template>
        <!-- 发布时间 -->
        <template #label>
          <span class="pubdate">{{ article.pubdate | relativeTime }}</span>
        </template>
        <!-- 关注按钮 -->
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <!-- 内容 -->
      <div
        class="markdown-body"
        ref="article-content"
        v-html="article.content"
      ></div>
      <!-- 底部交互栏 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          info="999"
          color="#777"
        />
        <van-icon
          :name="article.is_collected ? 'star' : 'star-o'"
          :color="article.is_collected ? 'orange' : '#777'"
          @click="onCollect"
          :loading="isCollectLoading"
        />
        <van-icon
          :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          :color="article.attitude === 1 ? 'tomato' : '#777'"
          @click="onLike"
        />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
import '@/views/article/github-markdown.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false // 按钮加载中
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data: { data } } = await getArticleById(this.articleId)
      this.article = data

      // 文章预览图片
      this.$nextTick(() => {
        this.handleImagePreview()
      })
    },

    handleImagePreview () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      // 点击预览当前文章所有图片
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)

        img.onclick = () => {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },

    async onFollow () {
      // 关注按钮加载中
      this.isFollowLoading = true

      // 判断是否关注 已关注: true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }

      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },

    async onCollect () {
      // 收藏加载中
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })

      // 判断是否收藏 已收藏: true
      if (this.article.is_collected) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }

      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '取消收藏' : '收藏成功'}`)
    },

    async onLike () {
      // 点赞加载中
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })

      // 判断是否以点赞 已点赞: 1
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }

      this.$toast.success(`${this.article.attitude !== 1 ? '取消点赞' : '点赞成功'}`)
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  display: flex;
  flex-direction: column;

  .article-main {
    flex: 1;
    position: absolute;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-x: hidden;

    h1.title {
      padding: 25px 32px;
      font-size: 34px;
      background-color: #fff;
      color: #3a3a3a;
      margin: 0;
    }

    .user-info {
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 16px;
      }

      .name {
        font-size: 12px;
        color: rgb(7, 3, 3);
      }

      .pubdate {
        color: #b4b4b4;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .follow-btn {
        width: 160px;
        height: 58px;
      }
    }

    .markdown-body {
      padding: 32px;
      background-color: #fff;
    }

    ul {
      list-style: unset;
    }
  }

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
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    ::v-deep .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
