<template>
  <div class="channel-edit">
    <!-- 标题编辑 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '保存' : '编辑' }}</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{fixedChannels: fixedChannels.includes(channel.id)}"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <template #icon>
          <!-- 删除图标显示隐藏 不包含固定的频道 -->
          <van-icon
           name="clear"
           v-show="isEdit && !fixedChannels.includes(channel.id)"
          ></van-icon>
        </template>
        <template #text>
          <span
           class="text"
           :class="{active: index === active}"
          >{{ channel.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <template #title>
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    isChannelEditShow: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的图标
      fixedChannels: [0] // 固体的频道
    }
  },
  computed: {
    recommendChannels () {
      // 频道推荐 过滤掉也存在的频道
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })

      /* const channels = []
      // 筛选出 我的频道 中的频道
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })

        if (!ret) channels.push(channel)
      })

      return channels */
    },

    ...mapState(['user'])
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      await getAllChannels()
        .then((result) => {
          const { data: { data } } = result
          this.allChannels = data.channels
        }).catch((err) => {
          console.log(err)
          this.$toast('数据获取失败')
        })
    },

    async onAddChannel (channel) {
      this.myChannels.push(channel)

      // 数据持久化
      // 不同登录状态使用对应处理方式
      if (this.user) {
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    onMyChannelClick (channel, index) {
      // 判断当前切换按钮的状态
      if (this.isEdit) {
        if (this.fixedChannels.includes(channel.id)) {
          return
        }

        this.myChannels.splice(index, 1)

        if (index <= this.active) {
          this.$emit('update:active', this.active - 1)
        }

        // 删除登录状态用户频道
        this.deleteChannel(channel)
      } else {
        this.$emit('update:active', index)
        this.$emit('update:isChannelEditShow', false)
      }
    },

    async deleteChannel (channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 105px;

  .edit-btn {
    width: 105px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border-color: #f85959;
  }

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .grid-item {
    width: 160px;
    height: 86px;

    ::v-deep.van-grid-item__content {
      white-space: nowrap; // 不折行
      background-color: #f4f5f6;

      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: #f85959 !important;
      }
    }
  }

  ::v-deep.my-grid {
    .grid-item {
      &.fixedChannels > .van-grid-item__content {
        .text {
          color: #999;
        }
      }

      .van-grid-item__icon-wrapper {
        position: unset;

        .van-icon-clear {
          position: absolute;
          top: -16px;
          right: -16px;
          font-size: 32px;
          color: #a3a3a3;
          z-index: 2;
        }
      }
    }
  }

  ::v-deep.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 18px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
