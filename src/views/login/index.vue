<template>
  <div class="login-container">
    <!-- 导航栏  -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '请填写手机号'
        }, {
          pattern: /^(13[0-9]|14[5|7]|15[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }

      // 显示倒计时并隐藏验证码按钮
      this.isCountDownShow = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountDownShow = false

        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
