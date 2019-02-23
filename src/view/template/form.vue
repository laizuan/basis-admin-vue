<template>
  <div class="edit-content">
    <Form :model="form" :label-width="100" :rules="rules">
      <div class="card">
        <div class="title-box">
          <h3>基本信息</h3>
        </div>

        <Row>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="用户名" prop="user.userName">
            <Input v-model="form.user.userName" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="电话" prop="user.phone">
            <Input v-model="form.user.phone" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="用户拼音名称" prop="user.namePinyin">
            <Input v-model="form.user.namePinyin" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="邮箱" prop="user.email">
            <Input v-model="form.user.email" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="身份证号码" prop="user.idCard">
            <Input v-model="form.user.idCard" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="出生年月日" prop="user.birthDay">
            <Input v-model="form.user.birthDay" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="部门" prop="user.deptId">
            <Input v-model="form.user.deptId" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="职位" prop="user.position">
            <Input v-model="form.user.position" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="地址" prop="user.address">
            <Input v-model="form.user.address" clearable :maxlength="255"/>
          </FormItem>
          </Col>
        </Row>
      </div>

      <div class="card">
        <div class="title-box">
          <h3>账户信息</h3>
        </div>
        <Row>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="账户" prop="user.account">
            <Input v-model="form.user.account" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="密码" prop="user.password">
            <Input v-model="form.user.password" clearable/>
          </FormItem>
          </Col>
          <Col :sm="12" :md="8" :lg="6">
          <FormItem label="状态" prop="user.enable">
            <i-switch v-model="form.user.enable" size="large" true-value="1" false-value="0">
              <span slot="open">{{ $t('btn.enable') }}</span>
              <span slot="close">{{ $t('btn.disable') }}</span>
            </i-switch>
          </FormItem>
          </Col>
        </Row>
      </div>

      <div class="card">
        <div class="title-box">
          <h3>授权</h3>
        </div>
        <Row>

        </Row>
      </div>

    </Form>

    <div class="footerButton">
      <div class="padL1"></div>
      <div class="padR1">
        <Button class="btn">保存</Button>
        <Button class="btn">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import formMixin from '@/libs/mixin/formMixin'
  import model from './config/model'
  import rules from './config/rules'

  export default {
    name: "sys-user-form",
    data() {
      return {
        form: {
          user: model.new()
        },
        rules
      }
    },
    mixins: [formMixin],
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
