<template>
  <div>
    <h1>注册中心</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
<!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) =>{
      console.log('rule',rule);
      console.log('value',value);
      let patt = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
      if (!value.match(patt)){
        callback(new Error('请输入正确的邮箱格式!'));
      }else{
        callback()
      }
    };
    return {
      ruleForm: {
        username: '',
        email: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur'}
        ],
        email:[
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: validateEmail, trigger: 'blur'}
        ]
        ,
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post('/register', this.ruleForm).then(res => {
            _this.$router.push('/login')

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

<style scoped>

</style>
