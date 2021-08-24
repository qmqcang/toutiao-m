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
      >编辑</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
      >
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
        v-for="channel in allChannels"
        :key="channel.id"
        :text="channel.name"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

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
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道
    }
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
        color: #f85959;
        border-color: #f85959;
      }
    }
  }

  ::v-deep.my-grid {
    .grid-item {
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
