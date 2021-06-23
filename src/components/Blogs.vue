<template>
  <div class="container">
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>

              <router-link :to="{name: 'BlogDetail', params:{blogId: blog.id}}">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!--要加:绑定才行啊！
      而且，具体怎么用还得看文档！-->
      <el-pagination class="page"
                     background
                     layout="prev, pager, next"
                     :total="total" :current-page="currentPage" :page-size="pageSize"
                      @current-change="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Blogs",
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  components: {
    Header
  },
  methods: {
    page(currentPage) {
      const _this = this;
      _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
        console.log(res)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    }
  },
  created() {
    // 一创建的时候就调用这个方法
    this.page(1)
  }
}
</script>

<style scoped>
.page {
  max-width: 960px;
  text-align: center;
  margin: 0 auto;
}
</style>
