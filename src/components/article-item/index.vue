<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
         articleId: article.art_id
      }
    }"
  >
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </template>
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
      fit="cover"
    />
  </van-cell>
</template>

<script>

export default {
  name: 'ArticleItem',
  components: {
  },
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {

  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;

    .right-cover {
      width: 100%;
      height: 100%;
      padding-left: 25px;
    }
  }

  .label-info-wrap {

    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-of-type) {
        padding-right: 4px;
      }

      .cover-item-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
