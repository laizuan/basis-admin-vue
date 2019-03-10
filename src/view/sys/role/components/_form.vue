<template>
  <div class="edit-content">
    <Form :model="form" :label-width="100" :rules="rules" ref="roleForm">
      <div class="card">
        <div class="title-box">
          <h3>{{ $t('title.basic') }}</h3>
        </div>

        <FormItem :label="$t('system.role.column.roleName')" prop="role.roleName">
          <Input v-model="form.role.roleName" clearable/>
        </FormItem>

        <Row>
          <Col :span="12">
          <FormItem :label="$t('system.role.column.sortNo')" prop="role.sortNo">
            <InputNumber :max="99" :min="0" v-model="form.role.sortNo"></InputNumber>
          </FormItem>
          </Col>
          <Col :span="12">
          <FormItem :label="$t('system.role.column.status')" prop="role.enable">
            <i-switch v-model="form.role.enable.value" size="large" :true-value="1" :false-value="0">
              <span slot="open">{{ $t('btn.enable') }}</span>
              <span slot="close">{{ $t('btn.disable') }}</span>
            </i-switch>
          </FormItem>
          </Col>
        </Row>

        <FormItem :label="$t('system.role.column.remark')" prop="role.remark">
          <Input v-model="form.role.remark" type="textarea"/>
        </FormItem>

      </div>

      <div class="card">
        <div class="title-box">
          <h3>{{ $t('title.authorization') }}</h3>
        </div>
        <Row>
          <Col :span="23" offset="1">
            <Tree ref="menuTree" :data="menuList" show-checkbox multiple></Tree>
          </Col>
        </Row>
      </div>
    </Form>
    <div class="drawer-footer">
      <Button @click="doClose">{{ $t('btn.cancel') }}</Button>
      <Button type="primary" @click="doSave">{{ $t('btn.save') }}</Button>
    </div>
  </div>
</template>

<script>
import formMixin from '@/libs/mixin/formMixin'
import model from '../config/model'
import rules from '../config/rules'
import config from '../config/config'
import { sprintf } from '@/libs/util'
import menu from '@/libs/url/sys/menu'

export default {
  name: 'sys-role-form',
  props: {
    id: {
      type: Number,
      default: null
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        role: model.new()
      },
      menuList: [],
      permissions: config.permission,
      rules
    }
  },
  watch: {
    flag (val) {
      if (val) {
        if (this.id && this.id != 0) {
          this.$api.get(config.url.get, { roleId: this.id }, (res) => {
            this.form.role = res.data || model.new()
          })
        }
        this.$api.get(menu.url.getRoleTreeList, {roleId: this.id}, (res) => {
          this.menuList = res.data
        })
      } else {
        this.form.role = model.new()
      }
    }
  },
  mixins: [formMixin],
  mounted () {

  },
  methods: {
    doSave() {
      this.fromValidate('roleForm', () => {
        let checkedAndIndeterminateNodes = this.$refs.menuTree.getCheckedAndIndeterminateNodes();
        if (checkedAndIndeterminateNodes.length <= 0) {
          this.$api.validateFail()
        } else {
          let menuIds = [];
          checkedAndIndeterminateNodes.forEach(item => {
            if (item.checked) {
              menuIds.push(item.id)
            }
          });
          this.form.role.menuIds = menuIds;
          this.$emit('handleSave', this.form.role);
        }
      })
    },
    doClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style scoped>

</style>
