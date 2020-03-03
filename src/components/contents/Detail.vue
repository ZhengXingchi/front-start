
<template>
  <div class="layui-container">
    <Panel></Panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{page.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog==='ask'"
            >提问</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='advise'"
            >建议</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='discuss'"
            >交流</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='share'"
            >分享</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='logs'"
            >动态</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog==='notice'"
            >公告</span>

            <span
              class="layui-badge"
              style="background-color: #999;"
              v-if="parseInt(page.isEnd) === 0"
            >未结</span>
            <span class="layui-badge" style="background-color: #5FB878;" v-else>已结</span>

            <span class="layui-badge layui-bg-black" v-show="page.isTop==='1'">置顶</span>
            <span
              class="layui-badge"
              :class="tag.class"
              v-for="(tag,index) in page.tags"
              :key="'tags' + index"
            >{{tag.name}}</span>

            <!-- <div class="fly-admin-box" data-id="123"> -->
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span> -->

            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span> -->
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->

            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span> -->
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
            <!-- </div> -->
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{page.answer}}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{page.reads}}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img
                :src="page.user ? page.user.pic : 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'"
              />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{page.user ? page.user.name : ''}}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.user && page.user.isVip !== '0' ? page.user.isVip :false"
                >VIP{{page.user.isVip}}</i>
              </a>
              <span>{{page.created | moment }}</span>
            </div>
            <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin jie-admin-collection">收藏</a>
          </div>
          <div class="detail-body photos" v-html="content"></div>
        </div>

        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <ul class="jieda" id="jieda">
            <li class="jieda-daan" v-for="(item , index) in comments" :key="'comments' + index">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    :src="item.user ? item.user.pic : 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'"
                    alt=" "
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{item.user ? item.user.name :'test'}}</cite>
                    <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.user && item.user.isVip !== '0' ? item.user.isVip :false"
                    >VIP{{item.user.isVip}}</i>
                  </a>

                  <span v-if="index ===0">(楼主)</span>
                  <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
                </div>
                <div class="detail-hits">
                  <span>{{item.created | moment}}</span>
                </div>
                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
              <div class="jieda-reply">
                <span class="jieda-zan" :class="{'zanok':item.handed === '1'}" type="zan">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span
                    type="edit"
                    @click="editComent(item)"
                    v-show="page.isEnd === '0' && item.cuid.id ===user.id"
                  >编辑</span>
                  <!-- <span type="del">删除</span> -->
                  <span
                    class="jieda-accept"
                    @click="setBest(item)"
                    v-show="page.isEnd === '0' && item.cuid.id ===user.id"
                  >采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length===0">消灭零回复</li>
          </ul>
          <Pagination
            :showType="'icon'"
            :hasSelect="true"
            :total="total"
            :size="size"
            :current="current"
            :showEnd="true"
            @changeCurrent="handleChange"
            @changeLimitAndCurrent="handleLimitAndCurrent"
          ></Pagination>
          <div class="layui-form layui-form-pane">
            <form>
              <validation-observer ref="observer" v-slot="{validate}">
                <Editor @changeContent="addContent" :initContent="editInfo.content"></Editor>
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
                  <button class="layui-btn" type="button" @click="validate().then(submit)">提交回复</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <HotList></HotList>
        <Ads></Ads>
        <Links></Links>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api/content";
import { getComments, addComment } from "@/api/comments";
import HotList from "@/components/sidebar/HotList";
import Ads from "@/components/sidebar/Ads";
import Links from "@/components/sidebar/Links";
import Panel from "@/components/Panel";
import Editor from "@/components/modules/editor";
import CodeMix from "@/mixin/code";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Pagination from "@/components/modules/Pagination/index";
import { escapeHtml } from "@/utils/escapeHtml";
import { scrollToElem } from "@/utils/common";
export default {
  name: "detail",
  components: {
    HotList: HotList,
    Links: Links,
    Ads: Ads,
    Panel: Panel,
    Editor: Editor,
    ValidationProvider,
    Pagination: Pagination,
    ValidationObserver
  },
  mixins: [CodeMix],
  props: ["tid"],
  data() {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: "",
        code: "",
        sid: ""
      }
    };
  },
  mounted() {
    this.getPostDetail();
    this.getCommentsList();
  },
  methods: {
    editComent(item) {
      console.log("editComent", item);
      this.editInfo.content = item.content
      scrollToElem('.layui-form-block',1000,-65)
      document.getElementById('edit').focus()
    },
    setBest(item) {
      console.log("setBest", item, index);
      this.$confirm('确定采纳为最佳答案吗？',()=>{

      },()=>{

      })
    },
    handleChange(val) {
      this.current = val;
      this.getCommentsList();
    },
    handleLimitAndCurrent(current, size) {
      this.current = current;
      this.size = size;
      console.log(this.size, "22222");
      this.getCommentsList();
    },
    getPostDetail() {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data;
        }
      });
    },
    getCommentsList() {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data;
          this.total = res.total;
        }
      });
    },
    addContent(val) {
      this.editInfo.content = val;
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      const isLogin = this.$store.state.isLogin;
      if (!isLogin) {
        this.$pop("shake", "请先登录");
        return;
      }
      this.editInfo.code = this.code;
      this.editInfo.sid = this.$store.state.sid;
      this.editInfo.tid = this.tid;
      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$pop("", "发表评论成功");
          this.code = "";
          this.editInfo.content = "";
          const user = this.$store.state.userInfo;
          const cuid = {
            _id: user._id,
            pic: user.pic,
            name: user.name,
            isVip: user.isVip
          };
          res.data.cuid = cuid;
          this.comments.push(res.data);
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset();
          });
          // 刷新图形验证码
          this._getCode();
        }
      });
    }
  },
  computed: {
    content() {
      if (typeof this.page.content === "undefined") {
        return "";
      }
      if (this.page.content.trim() === "") {
        return "";
      }
      return escapeHtml(this.page.content);
    },
    user() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
</style>
