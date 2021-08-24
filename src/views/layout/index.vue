<template>
  <div class="layout-container">
    <!-- 主体 -->
    <router-view />
    <!-- 标签栏 -->
    <van-tabbar class="layout-tabbar" inactive-color="#000" active-color="#3296fa" route>
      <van-tabbar-item to="/" @click="backTop">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  },
  methods: {
    backTop () {
      // const scrollTop = this.$children[0].$refs.article[0].$el.scrollTop
      // if (scrollTop === 0) {
      //   this.$children[0].$refs.article[0].isFreshLoading = true
      //   this.$children[0].$refs.article[0].onRefresh()
      // } else {
      //   this.$children[0].$refs.article[0].$el.scrollTop = 0
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {

  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
