<template>
  <div>
    <Header></Header>
    <div class="blog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="isOwner">
        <router-link :to="{name: 'BlogEdit', params:{blogId: blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-link class="delete-icon" icon="el-icon-delete" v-if="isOwner" @click="deleteBlog">
          删除
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content">

      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import 'github-markdown-css/github-markdown.css'
import Router from "vue-router";

export default {
  name: "BlogDetail",
  components: {
    Header
  },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: ""
      },
      isOwner: false
    }
  },
  created() {
    const _this = this
    const blogId = this.$route.params.blogId;
    this.$axios.get('/blog/' + blogId).then(res => {
      const blog = res.data.data
      // 回显内容
      _this.blog.id = blog.id
      _this.blog.title = blog.title

      // 进行渲染，不然是原格式
      var MarkdownIt = require("markdown-it")
      var md = new MarkdownIt()
      var result = md.render(blog.content);

      _this.blog.content = result
      _this.isOwner = blog.userId === _this.$store.getters.getUserInfo.id

    })
  },
  methods: {
    deleteBlog: function (){
      const _this = this
      const blogId = this.$route.params.blogId;
      this.$axios.get('/delete/' + blogId).then(res => {
        console.log('删除成功')
        this.$router.push("/")
      })

    }
  }
}
</script>

<style scoped>
.blog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  margin: 20px auto;
  padding: 20px;
}

.blog h2 {
  text-align: center;
}

.delete-icon{
  margin-left: 20px;
}
</style>
