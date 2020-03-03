<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-form-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quoto" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <face :isShow="current === 0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <img-upload :isShow="current === 1" @closeEvent="closeModal()" @addEvent="addPic"></img-upload>
      <link-add :isShow="current === 2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote :isShow="current === 3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input
        :isShow="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModal()"
        @addEvent="addCode"
      ></code-input>
      <preview :isShow="current === 6" :content="content" @closeEvent="closeModal()"></preview>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import Face from "./Face";
import ImgUpload from "./ImgUpload";
import LinkAdd from "./LinkAdd";
import Quote from "./Quote";
import CodeInput from "./Code";
import Preview from "./Preview";
export default {
  name: "editor",
  methods: {},
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },
  props: ['initContent'],
  data() {
    return {
      current: "",
      codeWidth: 400,
      codeHeight: 200,
      content: "",
      pos: ""
    };
  },
  watch: {
    initContent(newVal,oldVal) {
      console.log('newVal,oldVal',newVal,oldVal)
      this.content = newVal
    }
  },
  mounted() {
    this.$nextTick(() => {
      document
        .querySelector("body")
        .addEventListener("click", this.handleBodyClick);
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
      window.addEventListener("resize", () => {
        this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
        this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
      });
    });
  },
  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.handleBodyClick);
  },
  updated() {
    this.$emit("changeContent", this.content);
  },
  methods: {
    addFace(item) {
      console.log(item);
      const insertContent = ` face${item}`;
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    addLink(item) {
      console.log(item);
      const insertContent = ` a(${item})[${item}]`;
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    addPic(item) {
      const insertContent = `img[${item}]`;
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    addCode(item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`;
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    addQuote(item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`;
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    addHr() {
      this.insert(`\n[hr]`);
      this.pos += 5;
    },
    insert(val) {
      if (typeof this.content === "undefined") {
        return;
      }
      let temp = this.content.split("");
      temp.splice(this.pos, 0, val);
      console.log("this.pos", this.pos);
      this.content = temp.join("");
    },
    handleBodyClick(e) {
      e.stopPropagation();
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.closeModal();
      }
    },
    closeModal() {
      this.current = "";
    },
    choose(index) {
      if (index === this.current) {
        this.closeModal();
      } else {
        this.current = index;
      }
    },
    focusEvent() {
      console.log("2222");
      this.getPos();
    },
    blurEvent() {
      console.log("11111");
      this.getPos();
    },
    // 计算光标的当前位置
    getPos() {
      let cursorPos = 0;
      let elem = document.getElementById("edit");
      if (document.selection) {
        // IE
        let selectRange = document.selection.createRange();
        selectRange.moveStart("character", -elem.value.length);
        cursorPos = selectRange.text.length;
      } else if (elem.selectionStart || elem.selectionStart === "0") {
        cursorPos = elem.selectionStart;
      }
      console.log(cursorPos, "cursorPos");
      this.pos = cursorPos;
    }
  }
};
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
.fade-leave-active {
  animation: bounceOut 0.3s;
}
.fade-enter-active {
  animation: bounceIn 0.3s;
}
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  margin-top: 0;
  margin-left: 0;
}
</style>
