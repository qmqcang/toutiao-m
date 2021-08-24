<template>
  <div class="home-container">
    <!-- 顶部搜索 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
          class="search-btn"
          type="info"
          size="small"
          round
        >
          搜索
          <template #icon>
            <i class="toutiao toutiao-sousuo"></i>
          </template>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道搜索 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
       >
        <!-- 数据列表 -->
        <ArticleList ref="article" :channel="channel" />
      </van-tab>
      <!-- 右侧折叠菜单 -->
      <template #nav-right>
        <!-- 占位符 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 频道管理 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      :close-on-click-overlay="false"
    >
      <!-- 频道组件 -->
      <channel-edit
       :my-channels="channels"
       :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      await getUserChannels()
        .then((result) => {
          const { data: { data } } = result
          this.channels = data.channels
        }).catch((err) => {
          console.log(err)
          this.$toast('获取频道数据失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 174px 0 100px;

  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .toutiao {
      font-size: 32px;
    }
  }

  ::v-deep .channel-tabs {

    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 1;
    }

    .van-tabs__nav--complete {
      padding: 0;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab.van-tab--active {
      color: #333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }

    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }

    .hamburger-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background: #fff;
      opacity: .902;
      &::before {
        content: '';
        width: 1px;
        height: 100%;
        background: url('~@/assets/gradient-gray-line.png') no-repeat center center;
        background-size: cover;
        position: absolute;
        left: 0;
      }

      i.toutiao {
        font-size: 33px;
      }
    }
  }

  .van-popup {
    border-radius: 20px 20px 0 0;
  }
}
</style>
