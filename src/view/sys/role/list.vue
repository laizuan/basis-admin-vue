<template>
  <div class="card list-page-content">
    <Form ref="form" :model="queryForm" class="query-form">
      <Row :gutter="8">
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Input v-model="queryForm.roleName" :placeholder="$t('system.role.roleNameSelectPlaceholder')"/>
          </FormItem>
        </Col>
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Button class="mr10" icon="ios-search" @click="doQuery">{{$t('btn.search')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <TablePro
      :height="height - 170"
      :loading="loading"
      ref="tables"
      editable
      v-model="list"
      :columns="columns"
      :total="pageInfo.total"
      :bizKey="bizKey"
      @on-delete="doDelete"
      @to-edit="toEdit"
      @on-row-dblclick="toEdit"
      @on-selection-change="doSelectRow"
      @on-page-change="doChangePageIndex"
      @on-page-size-change="doChangePageSize"
    >
      <template slot="actionBar">
        <ButtonGroup type="primary" shape="circle">
          <!--v-permission="permissions.add"-->
          <Button @click="toAdd" icon="ios-add">{{$t('btn.add')}}</Button>
          <Button :disabled="selectRowData.length <= 0" @click="toEdit(null)" v-permission="permissions.delete"
                  icon="ios-trash-outline">{{$t('btn.delete')}}
          </Button>
        </ButtonGroup>
      </template>
    </TablePro>

    <Drawer
      class="edit-drawer"
      title="Create"
      v-model="roleFormFlag"
      width="720">
      <role-form :id="roleId"
                 @handleClose="roleFormFlag = false"
                 @handleSave="doSave" />
    </Drawer>
  </div>
</template>

<script>
import columns from './config/columns'
import listMixin from '@/libs/mixin/listMixin'
import config from './config/config'
import TablePro from '_c/table-pro'
import RoleForm from './components/_form'

export default {
  name: 'system-role-list',
  components: { TablePro, RoleForm },
  data () {
    return {
      roleId: null,
      queryForm: {},
      list: [],
      roleFormFlag: false,
      permissions: config.permission,
      selectRowData: [],
      bizKey: 'sysRoleManager',
      url: config.url,
      columns: columns.new(this)
    }
  },
  mixins: [listMixin],
  created () {
    this.doInit()
  },
  methods: {
    doInit () {
      this.doPage()
    },
    doDelete (row) {

    },
    toAdd () {
      this.roleFormFlag = true
      this.roleId = '0'
    },
    toEdit (row) {
      console.log(row)
      this.roleFormFlag = true
      this.roleId = row.id
    },
    doSave(data){
      let url = (data.id || data.id !== 0) ? config.url.update : config.url.add;
      this.$api.post(url, this.form.role, (res) => {
          if (res.data) {
            this.roleFormFlag = false;
            this.$api.messageSuccess()
            this.doInit()
          }
      })
    },
    doSelectRow (data) {
      this.selectRowData = data
    }
  }
}
</script>
