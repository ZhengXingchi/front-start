<template>
  <div
    class="d-flex"
    :class="{'flex-center':align==='center','flex-start':align==='left','flex-end':align==='right'}"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        @click.prevent="home()"
        class="layui-laypage-prev"
        v-show="showEnd"
        :class="{'layui-disabled': current === 0}"
      >
        <i class="layui-icon layui-icon-prev" v-if="showType==='icon'"></i>
        <template v-else>首页</template>
      </a>
      <a :class="{'layui-disabled': current === 0}" @click.prevent="prev()">
        <i class="layui-icon layui-icon-left" v-if="showType==='icon'"></i>
        <template v-else>上一页</template>
      </a>
      <a href="javascript:;" v-if="pages.length>5 && current-2>=1" class="layui-disabled">...</a>
      <template v-for="(item, index) in pages">
        <a
          @click.prevent="changeIndex(item, index)"
          v-if="index >= (current-2) && index<=(current+2)"
          :class="[current === index ? theme : '', current === index ? 'active' : '']"
          :key="'page'+index"
        >{{item}}</a>
      </template>
      <a
        href="javascript:;"
        v-if="pages.length>5 && current+2<pages.length-1"
        class="layui-disabled"
      >...</a>
      <a :class="{'layui-disabled': current === pages.length-1}" @click.prevent="next()">
        <i class="layui-icon layui-icon-right" v-if="showType==='icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a
        @click.prevent="end()"
        class="layui-laypage-next"
        v-show="showEnd"
        :class="{'layui-disabled': current === pages.length-1}"
      >
        <i class="layui-icon layui-icon-next" v-if="showType==='icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="my-input" @keyup.enter="jumpTo" />
      页 共 {{total}} 页
    </div>
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{'layui-form-selected': isSelect}"
        @click="changeFav()"
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item,index) in options"
            :key="'option' + index"
            @click="chooseFav(item, index)"
            :class="{'layui-this': index === optIndex}"
          >{{item}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "pagination",
  props: {
    align: {
      type: String,
      default: "center"
    },
    showType: {
      type: String,
      default: "text"
    },
    showEnd: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "layui-bg-green"
    },
    hasTotal: {
      type: Boolean,
      default: true
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  watch: {
    total(newVal, oldVal) {
      this.initPage();
    }
  },
  data() {
    return {
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      isSelect: false,
      pages: [],
      limit: 10
    };
  },
  methods: {
    changeFav() {
      this.isSelect = !this.isSelect;
    },
    chooseFav(item, index) {
      if (this.optIndex !== index) {
        // this.$emit(
        //   "changeCurrent",
        //   Math.floor((this.limit * this.current) / this.options[index])
        // );
        this.$emit(
          "changeLimitAndCurrent",
          Math.floor((this.limit * this.current) / this.options[index]),
          this.options[index]
        );
      }
      this.optIndex = index;
      this.limit = this.options[this.optIndex];
      this.initPage();
    },
    initPage() {
      const len = Math.ceil(this.total / this.limit);
      this.pages = _.range(1, len + 1);
    },
    home() {
      this.$emit("changeCurrent", 0);
    },
    end() {
      this.$emit("changeCurrent", this.pages.length - 1);
    },
    prev() {
      let cur = 0;
      if (this.current - 1 < 0) {
        cur = 0;
      } else {
        cur = this.current - 1;
      }
      this.$emit("changeCurrent", cur);
    },
    next() {
      let cur = 0;
      if (this.current + 1 >= this.pages.length) {
        cur = this.pages.length - 1;
      } else {
        cur = this.current + 1;
      }
      this.$emit("changeCurrent", cur);
    },
    changeIndex(item, index) {
      if (index === this.current) {
        return;
      }
      console.log("item, index", item, index);
      this.$emit("changeCurrent", index);
    },
    jumpTo(event) {
      const result = event.target.value;
      let cur = this.current;
      if (result > this.total || result < 0) {
        this.$pop("shake", "请输入正确的页码");
      } else {
        cur = result - 1;
      }
      if (cur !== this.current) {
        this.$emit("changeCurrent", cur);
      }
    }
  },
  mounted() {
    this.initPage();
    this.limit = this.size;
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)));
    this.optIndex = this.options.indexOf(this.size);
  }
};
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 10px;
  position: relative;
  top: -2px;
}
.my-input {
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
  width: 30px;
  border: 1px solid rgb(226, 226, 226);
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
