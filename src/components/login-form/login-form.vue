<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" :placeholder="$t('login.username')">
        <span slot="prepend">
          <Icon type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" :placeholder="$t('login.password')">
        <span slot="prepend">
          <Icon type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" :loading="loading" type="primary" long>{{ $t('login.logIn') }}</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: window.app.$t('login.errorUsername'), trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: window.app.$t('login.errorPassword'), trigger: 'blur' }
        ]
      }
    }
  },
  data: function () {
    return {
      form: {
        userName: 'administrator',
        password: '123456'
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
