<template>
  <div>
    <a-row :gutter="16" type="flex" justify="start">
      <a-col
        v-for="(item, index) in bustopList"
        :key="index"
        v-model="bustopList"
        :span="8"
      />
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bustopList: []
    }
  },
  created () {
    this.currentPath = this.$route.path
  },
  mounted () {

  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
