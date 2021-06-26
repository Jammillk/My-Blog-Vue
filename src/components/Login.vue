<template>
  <div>
    <el-container>
      <el-header>
        <img class="myLogo" src="https://tanjiaming99.com/upload/2021/06/moving-e1d876a16627470290ab2275756deb27.gif">
        <!--        <img class="myLogo" src="E:\my_code_way\studu_project\blog_project_learn_vue\src\assets\nlogo.jpg">-->
      </el-header>
      <el-main>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm">
          <el-form-item label="用户名" prop="ff
          username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'tim',
        password: '111111'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 先把this存起来
          const _this = this;
          this.$axios.post('/login', this.ruleForm).then(res => {
            // 这个参数要分享到所有的组件
            const jwt = res.headers['authorization']
            const userInfo = res.data.data

            // 存储数据，共享
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            // 也可以通过这种方式调用getter方法来获取用户信息
            console.log(_this.$store.getters.getUserInfo)
            // 跳转到详情页面
            _this.$router.push("/blogs")
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #27b0ff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.myLogo {
  height: 90%;
  margin-top: 3px;
}

.login-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>
