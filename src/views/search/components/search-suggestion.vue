<template>
  <div class="search-suggestion">
    <van-cell title="联想" icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  watch: {
    searchText: {
      handler (value) {
        console.log(value)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
