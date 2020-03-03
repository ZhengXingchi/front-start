<template>
    <transition name="fade">
    <div id="preview" class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detail-body" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { escapeHtml } from '@/utils/escapeHtml'
export default {
  name: '',
  props: ['isShow', 'content'],
  data () {
    return {
    }
  },
  computed: {
    replaceContent () {
      // 根据content的内容,转义html的代码
      console.log('computed', this.content)
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      console.log(escapeHtml(this.content))
      return escapeHtml(this.content)
    }
  },
  methods: {
    cancel () {
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
#preview{
    position:fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    top: 0;
    left: 0;
    z-index: 1000000;
    // overflow-y: auto;
}
</style>
