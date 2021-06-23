<template>
  <div class="content">
    <h3>欢迎来到゛魚生的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <div class="action">
      <span><el-link type="primary" href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表文章</el-link></span>
      <el-divider  direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="info" href="/login">登录</el-link></span>
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://lh3.googleusercontent.com/proxy/uFfVM8bPbIjhwM_dnOneUyon-xkaBNHyMLXPn9qkM1q2ozPLlLqOSydNrJBNS_sKvxfykPCU93LG1S3UaDcB4GHEB-HtQt8kMzkXNo8'
      },
      hasLogin: false
    }
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO");
        _this.$router.push("/login");
      })
      this.hasLogin = false
    }
  },
  created() {
    if (this.$store.getters.getUserInfo.username){
      this.user.username = this.$store.getters.getUserInfo.username
      this.user.avatar = this.$store.getters.getUserInfo.avatar
      this.hasLogin = true;
    }
  }
}
</script>

<style scoped>

.content {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}

.action {
  margin: 10px 0;
}
</style>
