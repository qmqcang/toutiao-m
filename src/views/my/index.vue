<template>
  <div class="my-container">
    <!-- 用户未登录 -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 用户以登陆 -->
    <div class="header user-info" v-else>
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >
            编辑资料
          </van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i class="toutiao toutiao-shoucang" slot="icon"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template v-slot:icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template v-slot:text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      class="logout-cell"
      title="退出登陆"
      v-if="user"
      clickable
      @click="onLogout"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 用户登录时加载数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出当前账号？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
      })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {

  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {

    .base-info {
      display: flex;
      height: 231px;
      padding: 76px 32px 23px;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
        }

        .name {
          font-size: 30px;
          color: #fff;
          padding-left: 23px;
        }
      }

      .right {
        display: flex;
      }
    }

    .data-status {
      display: flex;

      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 130px;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {

    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      i.toutiao.toutiao-shoucang {
        color: #eb5253;
      }
      i.toutiao.toutiao-lishi {
        color: #ff9d1d;
      }

      span.text {
        font-size: 18px;
      }
    }
  }

  .mb-9 {
    margin-bottom: 9px;
  }

  .logout-cell {
    text-align: center;
    color: #ce8a8a;
  }
}
</style>
