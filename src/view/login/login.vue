<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <h2>{{$t('login.title')}}</h2>
      <div class="form-con">
        <div class="input input--jiro" :class="{'input--filled':form.username}">
					<input class="input__field input__field--jiro" type="text" v-model="form.username"/>
					<label class="input__label input__label--jiro">
						<span class="input__label-content input__label-content--jiro">
                     <Icon size="22" type="ios-person"></Icon>{{$t('login.username')}}
            </span>
					</label>
				</div>
        <div class="input input--jiro" :class="{'input--filled':form.password}">
					<input class="input__field input__field--jiro" type="password" v-model="form.password"/>
					<label class="input__label input__label--jiro">
						<span class="input__label-content input__label-content--jiro">
                  <Icon size="18" type="md-lock"></Icon>{{$t('login.password')}}
            </span>
					</label>
				</div>
        <div class="input submitBtn" :class="{'spinbtn': loading}" v-waves @click="handleSubmit" >
          <div class="spin" v-show="loading"></div>
            <Icon type="ios-loading" v-if="loading" size=18 class="spin-icon-load"></Icon>
          {{ $t('login.logIn') }}
        </div>
      </div>
    </div>
    <particles
      :particleSize="5"
      :linesWidth="2"
    />
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import particles from '@/components/particles'
export default {
  data () {
    return {
      form: {
        username: 'Administrator',
        password: '123456'
      },
      loading: false
    }
  },
  components: {
    LoginForm,
    particles
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit () {
      if (this.loading) {
        return;
      }
      let {username, password} =  this.form;
      if (!username) {
        this.$api.notiWarning(this.$api.getI18n('login.errorUsername'))
        return ;
      }
      if (!password) {
        this.$api.notiWarning(this.$api.getI18n('login.errorPassword'))
        return;
      }
      this.loading = true;
      this.handleLogin({username, password}).then(res => {
        const msg = this.$Message.loading({
          content: this.$t('login.success') + '，' + this.$t('message.loadingResources'),
          duration: 0
        });
        this.getUserInfo().then(res => {
          this.$Message.destroy()
          this.$router.push({
            name: this.$config.homeName
          })
        }).catch(() => {
          setTimeout(msg, 100);
          this.loading = false;
        })
      }).catch(() => {
        this.loading = false;
      })
    }
  }
}
</script>
