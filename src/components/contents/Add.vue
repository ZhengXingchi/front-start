<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <!--<div class="fly-none">没有权限</div>-->
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">
              发表新帖
              <!-- 编辑帖子 -->
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <form>
                <validation-observer ref="observer" v-slot="{validate}">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}">
                        <div class="layui-row">
                          <label class="layui-form-label">所在专栏</label>
                          <div class="layui-input-block" @click="changeSelect">
                            <div
                              class="layui-unselect layui-form-select"
                              :class="{'layui-form-selected': isSelect}"
                            >
                              <div class="layui-select-title">
                                <input
                                  type="text"
                                  playceholder="请选择"
                                  readonly
                                  v-model="catalogs[cataIndex].text"
                                  class="layui-input layui-unselect"
                                />
                                <i class="layui-edge"></i>
                              </div>
                              <dl class="layui-anim layui-anim-upbit">
                                <dd
                                  v-for="(item,index) in catalogs"
                                  :key="'catalog'+index"
                                  :class="{'layui-this': index === cataIndex}"
                                  @click="chooseCatalog(item, index)"
                                >{{item.text}}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00">{{errors[0]}}</span>
                        </div>
                      </validation-provider>
                    </div>
                    <div class="layui-col-md9">
                      <validation-provider name="title" rules="required" v-slot="{errors}">
                        <div class="layui-row">
                          <label for="L_title" class="layui-form-label">标题</label>
                          <div class="layui-input-block">
                            <input type="text" v-model="title" class="layui-input" />
                            <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                          </div>
                        </div>
                        <div class="layui-row">
                          <span style="color: #c00">{{errors[0]}}</span>
                        </div>
                      </validation-provider>
                    </div>
                  </div>
                  <!-- <div class="layui-row layui-col-space15 layui-form-item layui-hide" id="LAY_quiz">
                    <div class="layui-col-md3">
                      <label class="layui-form-label">所属产品</label>
                      <div class="layui-input-block">
                        <select name="project">
                          <option></option>
                          <option value="layui">layui</option>
                          <option value="独立版layer">独立版layer</option>
                          <option value="独立版layDate">独立版layDate</option>
                          <option value="LayIM">LayIM</option>
                          <option value="Imooc社区模板">Imooc社区模板</option>
                        </select>
                      </div>
                    </div>
                    <div class="layui-col-md3">
                      <label class="layui-form-label" for="L_version">版本号</label>
                      <div class="layui-input-block">
                        <input
                          type="text"
                          id="L_version"
                          value
                          name="version"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                    </div>
                    <div class="layui-col-md6">
                      <label class="layui-form-label" for="L_browser">浏览器</label>
                      <div class="layui-input-block">
                        <input
                          type="text"
                          id="L_browser"
                          value
                          name="browser"
                          placeholder="浏览器名称及版本，如：IE 11"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                    </div>
                  </div>-->
                  <!-- <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea
                        id="L_content"
                        name="content"
                        required
                        lay-verify="required"
                        placeholder="详细描述"
                        class="layui-textarea fly-editor"
                        style="height: 260px;"
                      ></textarea>
                    </div>
                  </div>-->
                  <editor @changeContent="add" :initContent="content"></editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{'layui-form-selected': isSelect_fav}"
                          @click="ChangeSelectFav"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                              v-for="(item,index) in favList"
                              :key="'fav'+index"
                              @click="chooseFav(item,index)"
                              :class="{'layui-this': index === favIndex}"
                            >{{item}}</dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      ref="codefield"
                      rules="required|length:4"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
                  </div>
                </validation-observer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Editor from "../modules/editor/index";
import CodeMix from "@/mixin/code";
import { addPost } from "@/api/content";
export default {
  name: "add",
  components: {
    Editor,
    ValidationProvider,
    ValidationObserver
  },
  mixins: [CodeMix],
  data() {
    return {
      cataIndex: 0,
      favIndex: 0,
      isSelect: false,
      isSelect_fav: false,
      catalogs: [
        {
          text: "请选择",
          value: ""
        },
        {
          text: "提问",
          value: "ask"
        },
        {
          text: "提问",
          value: "ask"
        },
        {
          text: "讨论",
          value: "discuss"
        },
        {
          text: "建议",
          value: "advice"
        }
      ],
      favList: [20, 30, 50, 60, 80],
      content: "",
      title: ""
    };
  },
  mounted() {
    const saveData = localStorage.getItem("addData");
    if (saveData && saveData !== "") {
      this.$confirm(
        "是否加载未编辑的内容?",
        () => {
          let obj = JSON.parse(saveData);
          this.title = obj.title;
          this.cataIndex = obj.cataIndex;
          this.content = obj.content;
          this.favIndex = obj.favIndex;
        },
        () => {
          localStorage.setItem("addData", "");
        }
      );
    }
  },
  methods: {
    chooseCatalog(item, index) {
      this.cataIndex = index;
    },
    chooseFav(item, index) {
      this.favIndex = index;
    },
    changeSelect() {
      this.isSelect = !this.isSelect;
    },
    ChangeSelectFav() {
      this.isSelect_fav = !this.isSelect_fav;
    },
    add(val) {
      this.content = val;
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      };
      if (this.title.trim() !== "" && this.content.trim() !== "") {
        localStorage.setItem("addData", JSON.stringify(saveData));
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      if (this.content.trim() === "") {
        this.$alert("文章内容不得为空");
        return;
      }
      addPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem("addData", "");
          this.$pop("", "发帖成功");
          setTimeout(() => {
            this.$router.push({
              name: "detail",
              params: { tid: res.data._id }
            });
          }, 2000);
        } else {
          this.$alert(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
